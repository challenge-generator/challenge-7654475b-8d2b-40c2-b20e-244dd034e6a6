import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MicrofrontendConfig } from '../models/microfrontend.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MICROFRONTEND_CONFIG } from '../tokens/microfrontend.token';

/**
 * Guard que verifica si el micro-frontend asociado a una ruta está disponible
 * y lo carga dinámicamente usando Module Federation.
 *
 * Implementa lazy loading de micro-frontends basado en rutas para optimizar
 * la carga inicial de la aplicación.
 */
@Injectable({ providedIn: 'root' })
export class MicrofrontendLoaderService {
  private readonly router = inject(Router);
  private readonly microfrontendConfig = inject(MICROFRONTEND_CONFIG);
  private loadedMicrofrontends = new Map<string, boolean>();

  /**
   * Intenta cargar el micro-frontend asociado a la ruta especificada.
   * @param microfrontendName Nombre del micro-frontend a cargar
   * @returns Observable<boolean> que emite true si el micro-frontend se cargó con éxito,
   *          false si falló pero se redirige a una ruta alternativa,
   *          o UrlTree si se debe redirigir a otra ruta.
   */
  loadMicrofrontend(microfrontendName: string): Observable<boolean | UrlTree> {
    if (this.loadedMicrofrontends.has(microfrontendName)) {
      return of(true);
    }

    const config = this.microfrontendConfig[microfrontendName];
    if (!config) {
      console.error(`Configuración no encontrada para micro-frontend: ${microfrontendName}`);
      return of(this.router.parseUrl('/not-found'));
    }

    return this.loadRemoteEntry(config.remoteEntry).pipe(
      tap(() => {
        this.loadedMicrofrontends.set(microfrontendName, true);
      }),
      map(() => true),
      catchError((error) => {
        console.error(`Error cargando micro-frontend ${microfrontendName}:`, error);
        // Redirige a una ruta alternativa si el micro-frontend no está disponible
        return of(this.router.parseUrl(config.fallbackRoute || '/dashboard-unavailable'));
      })
    );
  }

  /**
   * Carga el punto de entrada remoto del micro-frontend.
   * @param remoteEntry URL del remoteEntry.js del micro-frontend
   * @returns Observable<void> que completa cuando el remoteEntry se ha cargado
   */
  private loadRemoteEntry(remoteEntry: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      const script = document.createElement('script');
      script.src = remoteEntry;
      script.onload = () => {
        subscriber.next();
        subscriber.complete();
      };
      script.onerror = () => {
        subscriber.error(new Error(`No se pudo cargar el script: ${remoteEntry}`));
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    });
  }
}

/**
 * Configuración para un micro-frontend específico.
 */
export interface MicrofrontendConfig {
  remoteName: string;
  exposedModule: string;
  remoteEntry: string;
  fallbackRoute?: string;
}

/**
 * Guard que se encarga de cargar el micro-frontend asociado a la ruta actual.
 * @param route Segmento de ruta actual
 * @param state Estado de navegación
 * @returns Observable<boolean | UrlTree> que determina si se puede activar la ruta
 */
export const loadMicrofrontendGuard: CanActivateFn = (route, state) => {
  const microfrontendLoader = inject(MicrofrontendLoaderService);
  const microfrontendName = route.data['microfrontend'];

  if (!microfrontendName) {
    console.error('No se especificó micro-frontend para esta ruta');
    return of(false);
  }

  return microfrontendLoader.loadMicrofrontend(microfrontendName);
};

/**
 * Función que carga el módulo expuesto de un micro-frontend usando Module Federation.
 * @param microfrontendName Nombre del micro-frontend a cargar
 * @returns Promise con el módulo cargado
 */
export async function loadMicrofrontendModule(microfrontendName: string): Promise<any> {
  const config = inject(MICROFRONTEND_CONFIG)[microfrontendName];
  if (!config) {
    throw new Error(`Configuración no encontrada para micro-frontend: ${microfrontendName}`);
  }

  try {
    const module = await loadRemoteModule({
      remoteName: config.remoteName,
      exposedModule: config.exposedModule,
    });
    return module;
  } catch (error) {
    console.error(`Error cargando módulo del micro-frontend ${microfrontendName}:`, error);
    throw error;
  }
}
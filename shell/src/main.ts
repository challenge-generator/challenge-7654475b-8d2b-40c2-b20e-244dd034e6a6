import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, EnvironmentInjector } from '@angular/core';
import singleSpa, { singleSpaAngularHelpers } from 'single-spa/angular';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MicrofrontendLoaderService } from './app/core/load-microfrontend.guard';

(function load() {
  const MICROFRONTEND_CONFIG_URL = '/assets/config/microfrontends.json';
  
  async function fetchMicrofrontendConfig(): Promise<Record<string, { remoteEntry: string; module: string }>> {
    try {
      const response = await fetch(MICROFRONTEND_CONFIG_URL);
      if (!response.ok) {
        console.error('[Shell] Error al cargar configuración de micro-frontends:', response.statusText);
        return {};
      }
      return await response.json();
    } catch (error) {
      console.error('[Shell] Error de red al cargar micro-frontends:', error);
      return {};
    }
  }

  async function bootstrapAngular(): Promise<void> {
    const config = await fetchMicrofrontendConfig();
    
    const lifecycles = singleSpa({
      bootstrap: async (props) => {
        console.log('[Shell] Bootstrap iniciado', props);
        const container = document.getElementById('shell-root');
        if (!container) {
          const root = document.createElement('app-root');
          document.body.appendChild(root);
        }
      },
      mount: async (props) => {
        console.log('[Shell] Montando aplicación shell');
        const app = await bootstrapApplication(AppComponent, {
          providers: [
            provideAnimations(),
            provideRouter([], withComponentInputBinding()),
            importProvidersFrom(),
            {
              provide: 'MICROFRONTEND_CONFIG',
              useValue: config
            },
            {
              provide: APP_INITIALIZER,
              useFactory: (injector: EnvironmentInjector) => () => {
                return from(injector.inject(MicrofrontendLoaderService).loadMicrofrontend('')).toPromise();
              },
              deps: [EnvironmentInjector],
              multi: true
            }
          ]
        });
        console.log('[Shell] Aplicación shell montada correctamente');
      },
      unmount: async (props) => {
        console.log('[Shell] Desmontando aplicación shell', props);
      },
      unload: async (props) => {
        console.log('[Shell] Descargando aplicación shell', props);
      }
    });

    return lifecycles;
  }

  const bootstrapPromise = bootstrapAngular();
  
  singleSpa.start();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bootstrapPromise.then(() => {
        console.log('[Shell] Bootstrapping completado exitosamente');
      }).catch((error) => {
        console.error('[Shell] Error durante el bootstrap:', error);
      });
    });
  } else {
    bootstrapPromise.then(() => {
      console.log('[Shell] Bootstrapping completado exitosamente');
    }).catch((error) => {
      console.error('[Shell] Error durante el bootstrap:', error);
    });
  }
})();

export const bootstrap = async () => {
  const config = await fetchMicrofrontendConfig();
  return bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideRouter([], withComponentInputBinding()),
      {
        provide: 'MICROFRONTEND_CONFIG',
        useValue: config
      }
    ]
  });
};

export const mount = async (props: unknown) => {
  console.log('[Shell] Mounting con props:', props);
  return;
};

export const unmount = async (props: unknown) => {
  console.log('[Shell] Unmounting con props:', props);
  return;
};

export { singleSpaAngularHelpers };
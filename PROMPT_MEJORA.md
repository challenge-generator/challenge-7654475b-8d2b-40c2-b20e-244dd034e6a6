# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `mf-dashboard/src/app/dashboard.component.ts` — `Account.map`: Se invoca `map` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `mf-dashboard/src/app/dashboard.component.ts` — `Account.reduce`: Se invoca `reduce` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `mf-dashboard/src/app/dashboard.component.ts` — `Account.slice`: Se invoca `slice` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior

### Brecha de conocimiento
Entiende cuándo usar micro-frontends y aplica alguna estrategia para solucionar un problema de negocio (frontends with shared or non-shared runtime)

### Misión / candidato
Candidato con experiencia como Senior en Backend Node y Frontend Angular, trabajando en arquitecturas complejas.

### Reto
- Tema: Estrategias de micro-frontends
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación de una estrategia de micro-frontends en una arquitectura de banca digital
- Tiempo estimado: 2 semanas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Exploración y definición del problema — objetivo: Identificar las limitaciones actuales del sistema frontend y definir los requisitos para la implementación de micro-frontends. — entregable (NO resolver): Documento de requisitos para la implementación de micro-frontends.
- Fase 2: Diseño de la arquitectura de micro-frontends — objetivo: Diseñar la arquitectura de micro-frontends que cumpla con los requisitos definidos. — entregable (NO resolver): Diagrama de la arquitectura de micro-frontends y documento de diseño.
- Fase 3: Implementación de un micro-frontend — objetivo: Implementar un micro-frontend que cumpla con los requisitos de la arquitectura diseñada. — entregable (NO resolver): Código fuente del micro-frontend y documentación del proceso de implementación y despliegue.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2022",
    "useDefineForClassFields": false,
    "lib": [
      "es2022",
      "dom",
      "dom.iterable"
    ],
    "paths": {
      "@shared/*": [
        "shared/*"
      ],
      "@shell/*": [
        "shell/src/*"
      ],
      "@mf-dashboard/*": [
        "mf-dashboard/src/*"
      ]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "allowEmptyCodegenFiles": false
  },
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*test.ts"
  ]
}

// === ARCHIVO: shell/package.json ===
{
  "name": "shell",
  "version": "0.0.1",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --port 4200",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:single-spa": "webpack serve --config webpack/webpack.config.js",
    "build:single-spa": "webpack --config webpack/webpack.config.js"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.2.0",
    "@angular/common": "20.2.0",
    "@angular/compiler": "20.2.0",
    "@angular/core": "20.2.0",
    "@angular/forms": "20.2.0",
    "@angular/platform-browser": "20.2.0",
    "@angular/platform-browser-dynamic": "20.2.0",
    "@angular/router": "20.2.0",
    "@angular/material": "20.2.0",
    "rxjs": "~7.8.0",
    "single-spa": "^6.0.0",
    "zone.js": "~0.14.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.2.0",
    "@angular/cli": "~20.2.0",
    "@angular/compiler-cli": "~20.2.0",
    "@types/node": "^20.11.19",
    "typescript": "~5.4.2",
    "webpack": "^5.89.0",
    "@angular-architects/module-federation": "^20.0.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}

// === ARCHIVO: shell/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "shell": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/shell",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "server": "src/main.server.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "shared/styles/_variables.scss"
            ],
            "scripts": [],
            "vendorChunk": true,
            "extractLicenses": false,
            "optimization": false,
            "sourceMap": true,
            "namedChunks": true
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "shell:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "shell:build:production"
            },
            "development": {
              "browserTarget": "shell:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "shell:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/shell-server",
            "main": "src/main.server.ts",
            "tsConfig": "tsconfig.server.json",
            "optimization": true
          },
          "configurations": {
            "production": {
              "outputHashing": "media",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "sourceMap": false,
              "optimization": true
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "extractLicenses": false
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  },
  "defaultProject": "shell",
  "cli": {
    "analytics": false
  }
}

// === ARCHIVO: shared/models/account.model.ts ===
import { InjectionToken } from '@angular/core';

/**
 * Representa una cuenta bancaria con sus transacciones asociadas.
 * Se usa como modelo compartido entre el shell y todos los micro-frontends.
 */
export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'LOAN' | 'INVESTMENT';
  balance: number;
  currency: string;
  customerId: string;
  lastUpdated: Date;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'FEE' | 'INTEREST';
  description: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED';
  referenceId?: string;
  relatedAccountId?: string;
}

/**
 * DTO para la creación de una nueva cuenta bancaria.
 */
export interface CreateAccountRequest {
  accountType: 'CHECKING' | 'SAVINGS' | 'LOAN' | 'INVESTMENT';
  customerId: string;
  initialDeposit: number;
  currency: string;
}

/**
 * DTO para la respuesta de creación de cuenta.
 */
export interface CreateAccountResponse {
  accountId: string;
  accountNumber: string;
  status: 'CREATED' | 'FAILED';
  message?: string;
}

/**
 * Token de inyección para el servicio de cuentas.
 * Permite desacoplar la implementación concreta del servicio.
 */
export const ACCOUNT_SERVICE_TOKEN = new InjectionToken<AccountService>('AccountService');

/**
 * Contrato para el servicio de cuentas bancarias.
 * Define las operaciones disponibles sobre las cuentas.
 */
export interface AccountService {
  getAccounts(customerId: string): Promise<Account[]>;
  getAccountById(accountId: string): Promise<Account | null>;
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>;
  updateAccountStatus(accountId: string, status: 'ACTIVE' | 'FROZEN' | 'CLOSED'): Promise<boolean>;
  getTransactions(accountId: string, limit?: number): Promise<Transaction[]>;
}

/**
 * Excepción personalizada para errores relacionados con cuentas bancarias.
 */
export class AccountError extends Error {
  constructor(
    public readonly code:
      | 'ACCOUNT_NOT_FOUND'
      | 'INSUFFICIENT_FUNDS'
      | 'INVALID_ACCOUNT_TYPE'
      | 'ACCOUNT_FROZEN'
      | 'INVALID_AMOUNT'
      | 'CREATION_FAILED',
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AccountError';
  }
}

// === ARCHIVO: shell/src/app/core/load-microfrontend.guard.ts ===
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

// === ARCHIVO: shell/tsconfig.json ===
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc/shell",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.test.ts",
    "src/**/*.spec.ts"
  ],
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: shell/src/main.ts ===
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

// === ARCHIVO: shell/src/app/app.module.ts ===
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { MicrofrontendLoaderService } from './core/load-microfrontend.guard';

export interface MicrofrontendRouteConfig {
  path: string;
  name: string;
  remoteEntry: string;
  remoteModule: string;
  icon?: string;
  description?: string;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([], {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  providers: [
    MicrofrontendLoaderService,
    {
      provide: 'MICROFRONTEND_ROUTES',
      useValue: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          remoteModule: './Dashboard',
          icon: 'dashboard',
          description: 'Panel de control y métricas en tiempo real'
        },
        {
          path: 'accounts',
          name: 'Cuentas',
          remoteEntry: 'http://localhost:4202/remoteEntry.js',
          remoteModule: './Accounts',
          icon: 'account_balance',
          description: 'Gestión de cuentas bancarias'
        },
        {
          path: 'transactions',
          name: 'Transacciones',
          remoteEntry: 'http://localhost:4203/remoteEntry.js',
          remoteModule: './Transactions',
          icon: 'swap_horiz',
          description: 'Historial y gestión de transacciones'
        }
      ] as MicrofrontendRouteConfig[]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private microfrontendLoader: MicrofrontendLoaderService;
  private router: Router;

  constructor(loader: MicrofrontendLoaderService, router: Router) {
    this.microfrontendLoader = loader;
    this.router = router;
    this.configureMicrofrontendRouting();
  }

  private configureMicrofrontendRouting(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const microfrontendRoutes = this.getMicrofrontendRoutes();
      
      for (const route of microfrontendRoutes) {
        if (url.startsWith(`/${route.path}`)) {
          console.log(`[AppModule] Navegando a micro-frontend: ${route.name} (${route.path})`);
          this.preloadMicrofrontend(route.remoteEntry);
          break;
        }
      }
    });
  }

  private getMicrofrontendRoutes(): MicrofrontendRouteConfig[] {
    return [
      {
        path: 'dashboard',
        name: 'Dashboard',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        remoteModule: './Dashboard',
        icon: 'dashboard',
        description: 'Panel de control y métricas en tiempo real'
      },
      {
        path: 'accounts',
        name: 'Cuentas',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteModule: './Accounts',
        icon: 'account_balance',
        description: 'Gestión de cuentas bancarias'
      },
      {
        path: 'transactions',
        name: 'Transacciones',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        remoteModule: './Transactions',
        icon: 'swap_horiz',
        description: 'Historial y gestión de transacciones'
      }
    ];
  }

  private preloadMicrofrontend(remoteEntry: string): void {
    console.log(`[AppModule] Pre-cargando micro-frontend desde: ${remoteEntry}`);
  }

  public getRouteForPath(path: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(route => route.path === path);
  }

  public getAllRoutes(): MicrofrontendRouteConfig[] {
    return this.getMicrofrontendRoutes();
  }

  public isMicrofrontendPath(path: string): boolean {
    const routes = this.getMicrofrontendRoutes();
    return routes.some(route => path.startsWith(`/${route.path}`));
  }

  public getDefaultRoute(): string {
    return '/dashboard';
  }

  public getHomeRoute(): string {
    return '/';
  }

  public isRootPath(path: string): boolean {
    return path === '/' || path === '';
  }

  public getRouteDescription(path: string): string {
    const route = this.getRouteForPath(path.replace('/', ''));
    return route?.description || 'Sección de la aplicación';
  }

  public getRouteIcon(path: string): string {
    const route = this.getRouteForPath(path.replace('/', ''));
    return route?.icon || 'home';
  }

  public validateRouteExists(path: string): boolean {
    if (this.isRootPath(path)) {
      return true;
    }
    return this.getMicrofrontendRoutes().some(
      route => path.startsWith(`/${route.path}`)
    );
  }

  public getActiveMicrofrontends(): string[] {
    return this.getMicrofrontendRoutes().map(route => route.name);
  }

  public getMicrofrontendCount(): number {
    return this.getMicrofrontendRoutes().length;
  }

  public getMicrofrontendByName(name: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(
      route => route.name.toLowerCase() === name.toLowerCase()
    );
  }

  public getMicrofrontendByPath(path: string): MicrofrontendRouteConfig | undefined {
    return this.getMicrofrontendRoutes().find(
      route => `/${route.path}` === path || path.startsWith(`/${route.path}/`)
    );
  }

  public isDevelopmentMode(): boolean {
    return typeof window !== 'undefined' && 
           window.location.hostname === 'localhost';
  }

  public getEnvironment(): 'development' | 'production' {
    return this.isDevelopmentMode() ? 'development' : 'production';
  }

  public getRemoteEntryUrl(microfrontendName: string): string | undefined {
    const route = this.getMicrofrontendByName(microfrontendName);
    return route?.remoteEntry;
  }

  public getRemoteModule(microfrontendName: string): string | undefined {
    const route = this.getMicrofrontendByName(microfrontendName);
    return route?.remoteModule;
  }

  public getMicrofrontendPaths(): string[] {
    return this.getMicrofrontendRoutes().map(route => `/${route.path}`);
  }

  public getMicrofrontendNames(): string[] {
    return this.getMicrofrontendRoutes().map(route => route.name);
  }

  public getMicrofrontendByIndex(index: number): MicrofrontendRouteConfig | undefined {
    const routes = this.getMicrofrontendRoutes();
    return routes[index >= 0 && index < routes.length ? index : 0];
  }
}

// === ARCHIVO: shell/src/app/app.component.ts ===
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MicrofrontendLoaderService } from './core/load-microfrontend.guard';
import { HttpClient } from '@angular/common/http';
import { MicrofrontendConfig } from './core/load-microfrontend.guard';

interface MicrofrontendRoute {
  name: string;
  path: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav mode="side" opened class="shell-sidenav">
        <div class="sidenav-header">
          <mat-icon class="bank-icon">account_balance</mat-icon>
          <span class="bank-title">Banca Digital</span>
        </div>
        <mat-nav-list>
          @for (route of microfrontendRoutes; track route.path) {
            <a mat-list-item 
               [routerLink]="route.path" 
               routerLinkActive="active-route"
               (click)="navigateToMicrofrontend(route)">
              <mat-icon matListItemIcon>{{ route.icon }}</mat-icon>
              <span matListItemTitle>{{ route.name }}</span>
            </a>
          }
        </mat-nav-list>
        <div class="sidenav-footer">
          <div class="version-info">v1.0.0</div>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="shell-content">
        <mat-toolbar color="primary" class="shell-toolbar">
          <span class="toolbar-title">{{ currentTitle }}</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Configuración</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Cerrar sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <main class="microfrontend-outlet">
          @if (isLoading) {
            <div class="loading-overlay">
              <mat-spinner diameter="50"></mat-spinner>
              <p>Cargando {{ loadingMessage }}...</p>
            </div>
          }
          @if (loadError) {
            <div class="error-container">
              <mat-icon class="error-icon">error_outline</mat-icon>
              <h2>Error al cargar el módulo</h2>
              <p>{{ loadError }}</p>
              <button mat-raised-button color="primary" (click)="retryLoad()">
                Reintentar
              </button>
            </div>
          }
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell-container {
      height: 100vh;
      background: #f5f5f5;
    }

    .shell-sidenav {
      width: 260px;
      background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
      border-right: none;
    }

    .sidenav-header {
      display: flex;
      align-items: center;
      padding: 24px 16px;
      color: white;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .bank-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }

    .bank-title {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .sidenav-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .version-info {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      text-align: center;
    }

    .shell-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .shell-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .toolbar-title {
      font-size: 18px;
      font-weight: 400;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .microfrontend-outlet {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      position: relative;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
      z-index: 10;
    }

    .loading-overlay p {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      text-align: center;
    }

    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }

    .error-container h2 {
      color: #333;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #666;
      margin-bottom: 24px;
    }

    .active-route {
      background: rgba(255, 255, 255, 0.12) !important;
    }

    ::ng-deep .active-route .mat-list-item-content {
      background: rgba(255, 255, 255, 0.08);
    }
  `]
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly microfrontendLoader = inject(MicrofrontendLoaderService);
  private readonly http = inject(HttpClient);

  microfrontendRoutes: MicrofrontendRoute[] = [];
  currentTitle = 'Banca Digital';
  isLoading = false;
  loadingMessage = '';
  loadError: string | null = null;
  private failedRoute: MicrofrontendRoute | null = null;

  ngOnInit(): void {
    this.loadMicrofrontendsConfig();
  }

  private loadMicrofrontendsConfig(): void {
    this.http.get<MicrofrontendConfig>('/assets/config/microfrontends.json')
      .pipe(
        catchError(error => {
          console.error('Error cargando configuración de micro-frontends:', error);
          this.microfrontendRoutes = this.getDefaultRoutes();
          return of(this.getDefaultRoutes());
        })
      )
      .subscribe(config => {
        this.microfrontendRoutes = config.routes.map(route => ({
          name: route.name,
          path: route.path,
          icon: route.icon || 'extension',
          description: route.description || ''
        }));
      });
  }

  private getDefaultRoutes(): MicrofrontendRoute[] {
    return [
      { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', description: 'Vista principal del usuario' },
      { name: 'Cuentas', path: '/accounts', icon: 'account_balance', description: 'Gestión de cuentas' },
      { name: 'Transferencias', path: '/transfers', icon: 'swap_horiz', description: 'Realizar transferencias' },
      { name: 'Préstamos', path: '/loans', icon: 'payments', description: 'Gestión de préstamos' }
    ];
  }

  navigateToMicrofrontend(route: MicrofrontendRoute): void {
    this.currentTitle = route.name;
    this.loadError = null;
    
    if (route.path.startsWith('/')) {
      const microfrontendName = this.extractMicrofrontendName(route.path);
      if (microfrontendName) {
        this.isLoading = true;
        this.loadingMessage = route.name;
        
        this.microfrontendLoader.loadMicrofrontend(microfrontendName)
          .pipe(
            catchError(error => {
              console.error(`Error cargando micro-frontend ${microfrontendName}:`, error);
              this.loadError = `No se pudo cargar el módulo de ${route.name}. Por favor, intente de nuevo.`;
              return of(false);
            })
          )
          .subscribe(result => {
            this.isLoading = false;
            if (result) {
              this.router.navigate([route.path]);
            }
          });
      } else {
        this.router.navigate([route.path]);
      }
    }
  }

  private extractMicrofrontendName(path: string): string | null {
    const segments = path.split('/').filter(s => s);
    return segments.length > 0 ? segments[0] : null;
  }

  retryLoad(): void {
    if (this.failedRoute) {
      this.loadError = null;
      this.navigateToMicrofrontend(this.failedRoute);
    }
  }
}

// === ARCHIVO: shell/webpack/webpack.config.js ===
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new Map();
sharedMappings.set('@shared', path.resolve(__dirname, '../../shared'));

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    uniqueName: 'shell',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
      '@shell': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
          transpileOnly: true,
          getCustomTransformers: (program) => ({
            before: [],
            after: []
          })
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      exposes: {
        './AppModule': './src/app/app.module.ts',
        './AppComponent': './src/app/app.component.ts',
        './MicrofrontendLoader': './src/app/core/load-microfrontend.guard.ts',
        './SharedModule': '../../shared/shared.module.ts'
      },
      remotes: {
        'mf-dashboard': 'mfDashboard@http://localhost:4201/remoteEntry.js',
        'mf-accounts': 'mfAccounts@http://localhost:4202/remoteEntry.js',
        'mf-transfers': 'mfTransfers@http://localhost:4203/remoteEntry.js',
        'mf-loans': 'mfLoans@http://localhost:4204/remoteEntry.js'
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/material': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: '^20.0.0' },
        'rxjs': { singleton: true, strictVersion: true, requiredVersion: '^7.0.0' },
        'single-spa': { singleton: true, strictVersion: true, requiredVersion: '^6.0.0' },
        'zone.js': { singleton: true, strictVersion: true, requiredVersion: '^0.14.0' }
      }
    }),
    {
      hook: 'webpack WarlockPlugin',
      plugin: {
        apply(compiler) {
          compiler.hooks.afterEmit.tap('CleanupPlugin', (compilation) => {
            console.log('Shell micro-frontend build completed');
          });
        }
      }
    }
  ],
  devServer: {
    port: 4200,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 20
        },
        shared: {
          name: 'shared',
          chunks: 'all',
          minChunks: 2,
          priority: 5
        }
      }
    }
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

const webpack = require('webpack');

module.exports.plugins = (module.exports.plugins || []).concat(
  new webpack.DefinePlugin({
    'process.env': {
      'APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
      'BUILD_TIMESTAMP': JSON.stringify(Date.now())
    }
  })
);

// === ARCHIVO: shell/src/assets/config/microfrontends.json ===
{
  "version": "1.0.0",
  "environment": "development",
  "timeout": 30000,
  "retryAttempts": 3,
  "retryDelay": 1000,
  "routes": [
    {
      "name": "Dashboard",
      "path": "/dashboard",
      "remoteEntry": "http://localhost:4201/remoteEntry.js",
      "exposedModule": "./DashboardModule",
      "icon": "dashboard",
      "description": "Vista principal del dashboard con resumen de cuentas y actividad reciente",
      "routePath": "dashboard",
      "moduleName": "DashboardModule",
      "requiresAuth": true,
      "roles": ["user", "admin"],
      "loadStrategy": "eager",
      "priority": 1
    },
    {
      "name": "Cuentas",
      "path": "/accounts",
      "remoteEntry": "http://localhost:4202/remoteEntry.js",
      "exposedModule": "./AccountsModule",
      "icon": "account_balance",
      "description": "Gestión integral de cuentas bancarias, consulta de saldo y movimientos",
      "routePath": "accounts",
      "moduleName": "AccountsModule",
      "requiresAuth": true,
      "roles": ["user", "admin"],
      "loadStrategy": "lazy",
      "priority": 2
    },
    {
      "name": "Transferencias",
      "path": "/transfers",
      "remoteEntry": "http://localhost:4203/remoteEntry.js",
      "exposedModule": "./TransfersModule",
      "icon": "swap_horiz",
      "description": "Sistema de transferencias internas y externas con validación en tiempo real",
      "routePath": "transfers",
      "moduleName": "TransfersModule",
      "requiresAuth": true,
      "roles": ["user", "admin"],
      "loadStrategy": "lazy",
      "priority": 3
    },
    {
      "name": "Préstamos",
      "path": "/loans",
      "remoteEntry": "http://localhost:4204/remoteEntry.js",
      "exposedModule": "./LoansModule",
      "icon": "payments",
      "description": "Gestión de préstamos, simulación de cuotas y seguimiento de pagos",
      "routePath": "loans",
      "moduleName": "LoansModule",
      "requiresAuth": true,
      "roles": ["user", "admin"],
      "loadStrategy": "lazy",
      "priority": 4
    },
    {
      "name": "Inversiones",
      "path": "/investments",
      "remoteEntry": "http://localhost:4205/remoteEntry.js",
      "exposedModule": "./InvestmentsModule",
      "icon": "trending_up",
      "description": "Portafolio de inversiones, mercados y seguimiento de rendimientos",
      "routePath": "investments",
      "moduleName": "InvestmentsModule",
      "requiresAuth": true,
      "roles": ["user", "admin", "investor"],
      "loadStrategy": "lazy",
      "priority": 5
    },
    {
      "name": "Tarjetas",
      "path": "/cards",
      "remoteEntry": "http://localhost:4206/remoteEntry.js",
      "exposedModule": "./CardsModule",
      "icon": "credit_card",
      "description": "Gestión de tarjetas de crédito y débito, límites y bloqueos",
      "routePath": "cards",
      "moduleName": "CardsModule",
      "requiresAuth": true,
      "roles": ["user", "admin"],
      "loadStrategy": "lazy",
      "priority": 6
    },
    {
      "name": "Soporte",
      "path": "/support",
      "remoteEntry": "http://localhost:4207/remoteEntry.js",
      "exposedModule": "./SupportModule",
      "icon": "help_outline",
      "description": "Centro de ayuda, tickets de soporte y chat con asesores",
      "routePath": "support",
      "moduleName": "SupportModule",
      "requiresAuth": false,
      "roles": ["user", "admin", "guest"],
      "loadStrategy": "lazy",
      "priority": 7
    }
  ],
  "shared": {
    "authService": {
      "remoteEntry": "http://localhost:4200/remoteEntry.js",
      "exposedModule": "./AuthService"
    },
    "notificationService": {
      "remoteEntry": "http://localhost:4200/remoteEntry.js",
      "exposedModule": "./NotificationService"
    },
    "theme": {
      "primaryColor": "#1a237e",
      "secondaryColor": "#283593",
      "accentColor": "#ff6f00",
      "warnColor": "#f44336"
    }
  },
  "fallback": {
    "enabled": true,
    "localModules": {
      "dashboard": "./fallback/dashboard-fallback.component.ts",
      "accounts": "./fallback/accounts-fallback.component.ts"
    }
  },
  "logging": {
    "enabled": true,
    "level": "debug",
    "includeTimestamp": true
  }
}

// === ARCHIVO: mf-dashboard/package.json ===
{
  "name": "mf-dashboard",
  "version": "0.0.1",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --port 4201",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:single-spa": "webpack serve --config webpack/webpack.config.js --port 4201",
    "build:single-spa": "webpack --config webpack/webpack.config.js"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.2.0",
    "@angular/common": "20.2.0",
    "@angular/compiler": "20.2.0",
    "@angular/core": "20.2.0",
    "@angular/forms": "20.2.0",
    "@angular/platform-browser": "20.2.0",
    "@angular/platform-browser-dynamic": "20.2.0",
    "@angular/router": "20.2.0",
    "@angular/material": "20.2.0",
    "rxjs": "~7.8.0",
    "single-spa": "^6.0.0",
    "zone.js": "~0.14.2"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.2.0",
    "@angular/cli": "~20.2.0",
    "@angular/compiler-cli": "~20.2.0",
    "@types/node": "^20.11.19",
    "typescript": "~5.4.2",
    "webpack": "^5.89.0",
    "@angular-architects/module-federation": "^20.0.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}

// === ARCHIVO: mf-dashboard/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "mf-dashboard": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/mf-dashboard",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "../shared/styles/_variables.scss"
            ],
            "scripts": [],
            "vendorChunk": true,
            "extractLicenses": false,
            "optimization": false,
            "sourceMap": true,
            "namedChunks": true
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "mf-dashboard:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "mf-dashboard:build:production"
            },
            "development": {
              "browserTarget": "mf-dashboard:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "mf-dashboard:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "defaultProject": "mf-dashboard",
  "cli": {
    "analytics": false
  }
}

// === ARCHIVO: mf-dashboard/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2022",
    "useDefineForClassFields": false,
    "lib": [
      "es2022",
      "dom",
      "dom.iterable"
    ],
    "paths": {
      "@shared/*": [
        "../shared/*"
      ],
      "@shell/*": [
        "../shell/src/*"
      ],
      "@mf-dashboard/*": [
        "src/*"
      ]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "allowEmptyCodegenFiles": false
  },
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*test.ts"
  ]
}

// === ARCHIVO: mf-dashboard/src/main.ts ===
import { importSPAParticipant } from 'single-spa';
import { mount, bootstrap, unmount, unload } from './bootstrap';

declare global {
  interface Window {
    System: {
      import: (module: string) => Promise<unknown>;
    };
  }
}

const lifecycles = {
  bootstrap,
  mount,
  unmount,
  unload,
};

if (window.singleSpaAngularV2) {
  window.singleSpaAngularV2(lifecycles);
} else {
  window.addEventListener('single-spa:first-mount', () => {
    const event = new CustomEvent('mf-dashboard:mounted', {
      detail: { timestamp: Date.now() },
    });
    window.dispatchEvent(event);
  });

  window.addEventListener('single-spa:routing-event', () => {
    console.log('[mf-dashboard] Routing event detected, checking for lazy routes');
  });

  window.addEventListener('single-spa:app-change', (event: Event) => {
    const customEvent = event as CustomEvent<{ appName: string; appStatus: string }>;
    console.log(`[mf-dashboard] App change: ${customEvent.detail.appName} - ${customEvent.detail.appStatus}`);
  });

  window.addEventListener('single-spa:no-app-change', () => {
    console.log('[mf-dashboard] No app change detected');
  });

  window.addEventListener('single-spa:mount-spa-participant', async (event: Event) => {
    const customEvent = event as CustomEvent<{ participantId: string }>;
    console.log(`[mf-dashboard] Mounting participant: ${customEvent.detail.participantId}`);
    
    try {
      const participantModule = await window.System.import(customEvent.detail.participantId);
      console.log(`[mf-dashboard] Participant loaded:`, participantModule);
    } catch (error) {
      console.error(`[mf-dashboard] Failed to load participant:`, error);
    }
  });

  if (typeof window.singleSpa !== 'undefined') {
    window.singleSpa.registerApplication(
      'mf-dashboard',
      async () => lifecycles,
      (location) => location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/accounts')
    );
  } else {
    console.warn('[mf-dashboard] single-spa not found in window, registering via importSPAParticipant');
    importSPAParticipant({
      name: 'mf-dashboard',
      mount,
      bootstrap,
      unmount,
      unload,
      activeIf: (location) => location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/accounts'),
    });
  }
}

console.log('[mf-dashboard] Micro-frontend initialized and ready for single-spa integration');
export default lifecycles;

// === ARCHIVO: mf-dashboard/src/bootstrap.ts ===
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { AccountService } from './app/services/account.service';
import { DashboardComponent } from './app/dashboard.component';
import { DashboardModule } from './app/dashboard.module';
import { authInterceptor } from '@shell/src/app/core/interceptors/auth.interceptor';
import { errorInterceptor } from '@shell/src/app/core/interceptors/error.interceptor';
import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

export async function bootstrap(): Promise<void> {
  console.log('[mf-dashboard] Starting bootstrap process');
  
  const platformLocation = document.querySelector('base')?.getAttribute('href') || '/';
  
  console.log('[mf-dashboard] Platform base href:', platformLocation);
  console.log('[mf-dashboard] Environment config:', {
    production: environment.production,
    apiUrl: environment.apiUrl,
    enableDebug: environment.enableDebug
  });
}

export async function mount(props: unknown): Promise<void> {
  console.log('[mf-dashboard] Mounting with props:', props);
  
  const mountProps = props as {
    domElement?: HTMLElement;
    baseUrl?: string;
    customerId?: string;
    authToken?: string;
  };

  const rootElement = mountProps?.domElement || document.getElementById('mf-dashboard-root');
  
  if (!rootElement) {
    console.error('[mf-dashboard] Root element not found');
    throw new Error('MF_DASHBOARD_ROOT_NOT_FOUND');
  }

  const baseUrl = mountProps?.baseUrl || '/';
  const customerId = mountProps?.customerId || '';
  const authToken = mountProps?.authToken || '';

  console.log('[mf-dashboard] Mounting to element:', rootElement.id);
  console.log('[mf-dashboard] Base URL:', baseUrl);
  console.log('[mf-dashboard] Customer ID:', customerId);

  try {
    const { AppModule } = await import('./app/app.module');
    
    await bootstrapApplication(AppModule, {
      providers: [
        provideRouter(
          [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { 
              path: 'overview', 
              loadComponent: () => import('./app/dashboard.component').then(m => m.DashboardComponent),
              data: { title: 'Dashboard Overview' }
            },
            { 
              path: 'accounts', 
              loadComponent: () => import('./app/pages/accounts-list.component').then(m => m.AccountsListComponent),
              data: { title: 'Accounts' }
            },
            { 
              path: 'accounts/:id', 
              loadComponent: () => import('./app/pages/account-detail.component').then(m => m.AccountDetailComponent),
              data: { title: 'Account Detail' }
            },
            { 
              path: 'transactions', 
              loadComponent: () => import('./app/pages/transactions.component').then(m => m.TransactionsComponent),
              data: { title: 'Transactions' }
            },
            { 
              path: 'analytics', 
              loadComponent: () => import('./app/pages/analytics.component').then(m => m.AnalyticsComponent),
              data: { title: 'Analytics' }
            },
          ],
          withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
        ),
        provideAnimations(),
        provideHttpClient(
          withInterceptors([authInterceptor, errorInterceptor])
        ),
        {
          provide: APP_BASE_HREF,
          useValue: baseUrl,
        },
        {
          provide: 'CUSTOMER_ID',
          useValue: customerId,
        },
        {
          provide: 'AUTH_TOKEN',
          useValue: authToken,
        },
        AccountService,
      ],
    });
    
    console.log('[mf-dashboard] Application mounted successfully');
  } catch (error) {
    console.error('[mf-dashboard] Failed to mount application:', error);
    throw error;
  }
}

export async function unmount(): Promise<void> {
  console.log('[mf-dashboard] Unmounting micro-frontend');
  
  const rootElement = document.getElementById('mf-dashboard-root');
  if (rootElement) {
    rootElement.innerHTML = '';
    console.log('[mf-dashboard] Root element cleared');
  }
}

export async function unload(): Promise<void> {
  console.log('[mf-dashboard] Unloading micro-frontend');
}

// === ARCHIVO: mf-dashboard/src/app/dashboard.module.ts ===
import { NgModule, APP_INITIALIZER, inject } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AccountsListComponent } from './pages/accounts-list.component';
import { AccountDetailComponent } from './pages/account-detail.component';
import { TransactionsComponent } from './pages/transactions.component';
import { AnalyticsComponent } from './pages/analytics.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { AccountService } from './services/account.service';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: DashboardComponent,
        data: { 
          title: 'Dashboard Overview',
          breadcrumb: 'Overview',
          animation: 'dashboard-overview'
        }
      },
      {
        path: 'accounts',
        loadChildren: () => import('./pages/accounts.routes').then(m => m.ACCOUNTS_ROUTES),
        data: { 
          title: 'Accounts',
          breadcrumb: 'Accounts',
          animation: 'accounts'
        }
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: { 
          title: 'Transactions',
          breadcrumb: 'Transactions',
          animation: 'transactions'
        }
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { 
          title: 'Analytics',
          breadcrumb: 'Analytics',
          animation: 'analytics'
        }
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'overview',
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DashboardComponent,
    AccountsListComponent,
    AccountDetailComponent,
    TransactionsComponent,
    AnalyticsComponent,
    AccountCardComponent,
    TransactionListComponent,
    BalanceChartComponent,
    QuickActionsComponent,
  ],
  providers: [
    AccountService,
    AnalyticsService,
    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (router: Router) => {
        return () => {
          console.log('[dashboard.module] Initializing dashboard module');
          
          router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe((event) => {
            const navEvent = event as NavigationEnd;
            console.log('[dashboard.module] Navigation to:', navEvent.urlAfterRedirects);
            
            const data = router.getCurrentNavigation()?.extras?.state as Record<string, unknown> || {};
            if (data['analytics']) {
              console.log('[dashboard.module] Tracking page view:', navEvent.urlAfterRedirects);
            }
          });
          
          return Promise.resolve(true);
        };
      },
      deps: [Router],
      multi: true,
    },
    {
      provide: 'DASHBOARD_CONFIG',
      useValue: {
        refreshInterval: 30000,
        maxAccounts: 10,
        transactionPageSize: 20,
        enableNotifications: true,
        charts: {
          type: 'line',
          colors: ['#1976d2', '#388e3c', '#f57c00'],
        },
      },
    },
  ],
  exports: [
    RouterModule,
    DashboardComponent,
  ],
})
export class DashboardModule {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  private readonly notificationService = inject(NotificationService);
  
  constructor() {
    console.log('[dashboard.module] DashboardModule constructed');
    this.setupRouteGuards();
    this.setupNavigationTracking();
  }
  
  private setupRouteGuards(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        
        if (url.includes('/accounts/') && !this.accountService.hasAccountPermission()) {
          console.warn('[dashboard.module] User lacks permission to view account details');
          this.router.navigate(['/dashboard/overview']);
        }
        
        if (url.includes('/analytics') && !this.accountService.hasAnalyticsPermission()) {
          console.warn('[dashboard.module] User lacks permission to view analytics');
          this.router.navigate(['/dashboard/overview']);
        }
      }
    });
  }
  
  private setupNavigationTracking(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot;
      const routeData = currentRoute.root.firstChild?.data as Record<string, unknown>;
      
      if (routeData) {
        console.log('[dashboard.module] Route data:', routeData);
        this.notificationService.trackPageView(routeData['title'] as string);
      }
    });
  }
}

// === ARCHIVO: mf-dashboard/src/app/dashboard.component.ts ===
import { Component, OnInit, OnDestroy, inject, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil, filter } from 'rxjs';
import { AccountService } from './services/account.service';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';
import { Account, Transaction } from '@shared/models/account.model';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { BalanceChartComponent } from './components/balance-chart/balance-chart.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';

interface DashboardState {
  accounts: Account[];
  recentTransactions: Transaction[];
  totalBalance: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    AccountCardComponent,
    TransactionListComponent,
    BalanceChartComponent,
    QuickActionsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly accountService = inject(AccountService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();
  
  readonly state = signal<DashboardState>({
    accounts: [],
    recentTransactions: [],
    totalBalance: 0,
    loading: true,
    error: null,
    lastUpdated: null,
  });
  
  readonly accounts = computed(() => this.state().accounts);
  readonly recentTransactions = computed(() => this.state().recentTransactions);
  readonly totalBalance = computed(() => this.state().totalBalance);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  
  readonly accountCount = computed(() => this.accounts().length);
  readonly activeAccounts = computed(() => 
    this.accounts().filter(a => a.status === 'ACTIVE').length
  );
  readonly hasAccounts = computed(() => this.accounts().length > 0);
  
  readonly formattedBalance = computed(() => {
    const balance = this.totalBalance();
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(balance);
  });
  
  readonly chartData = computed(() => {
    const accounts = this.accounts();
    return accounts.map(account => ({
      name: account.name,
      balance: account.balance,
      type: account.type,
      color: this.getAccountColor(account.type),
    }));
  });

  constructor() {
    effect(() => {
      const accounts = this.accounts();
      const total = this.totalBalance();
      
      console.log('[dashboard] Balance updated:', total, 'Accounts:', accounts.length);
      
      this.analyticsService.trackBalanceChange(total).pipe(
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  ngOnInit(): void {
    console.log('[dashboard] Initializing dashboard component');
    this.loadDashboardData();
    this.setupEventListeners();
    this.trackPageView();
  }

  ngOnDestroy(): void {
    console.log('[dashboard] Destroying dashboard component');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.updateState({ loading: true, error: null });
    
    const customerId = this.accountService.getCurrentCustomerId();
    console.log('[dashboard] Loading data for customer:', customerId);

    this.accountService.getAccounts(customerId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (accounts) => {
        console.log('[dashboard] Accounts loaded:', accounts.length);
        
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
        
        this.updateState({
          accounts,
          totalBalance,
          loading: false,
          lastUpdated: new Date(),
        });
        
        this.loadRecentTransactions();
        this.analyticsService.trackDashboardLoad(accounts.length, totalBalance);
      },
      error: (err) => {
        console.error('[dashboard] Failed to load accounts:', err);
        this.updateState({
          loading: false,
          error: 'Error al cargar las cuentas. Por favor, inténtelo de nuevo.',
        });
        this.showErrorNotification('Error al cargar las cuentas');
      },
    });
  }

  private loadRecentTransactions(): void {
    const accounts = this.accounts();
    if (accounts.length === 0) {
      this.updateState({ recentTransactions: [] });
      return;
    }

    const accountIds = accounts.slice(0, 3).map(a => a.id);
    const transactionRequests = accountIds.map(id => 
      this.accountService.getTransactions(id, 5)
    );

    this.accountService.getTransactions(accountIds[0], 10).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (transactions) => {
        console.log('[dashboard] Transactions loaded:', transactions.length);
        this.updateState({ recentTransactions: transactions.slice(0, 10) });
      },
      error: (err) => {
        console.warn('[dashboard] Failed to load transactions:', err);
      },
    });
  }

  private setupEventListeners(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      const navEvent = event as NavigationEnd;
      console.log('[dashboard] Navigation:', navEvent.urlAfterRedirects);
      this.trackPageView();
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'auth_token') {
        console.log('[dashboard] Auth token changed, reloading data');
        this.loadDashboardData();
      }
    });
  }

  private trackPageView(): void {
    this.analyticsService.trackPageView('Dashboard').pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => console.log('[dashboard] Page view tracked'),
      error: (err) => console.warn('[dashboard] Failed to track page view:', err),
    });
  }

  refreshData(): void {
    console.log('[dashboard] Refreshing dashboard data');
    this.loadDashboardData();
    this.showSuccessNotification('Datos actualizados');
  }

  onAccountSelected(account: Account): void {
    console.log('[dashboard] Account selected:', account.id);
    this.router.navigate(['/dashboard/accounts', account.id]);
    this.analyticsService.trackAccountSelection(account.id, account.type);
  }

  onTransactionSelected(transaction: Transaction): void {
    console.log('[dashboard] Transaction selected:', transaction.id);
    this.analyticsService.trackTransactionView(transaction.id, transaction.amount);
  }

  onQuickAction(action: string): void {
    console.log('[dashboard] Quick action triggered:', action);
    this.analyticsService.trackQuickAction(action);
    
    switch (action) {
      case 'transfer':
        this.router.navigate(['/dashboard/transfer']);
        break;
      case 'new-account':
        this.router.navigate(['/dashboard/accounts/new']);
        break;
      case 'statements':
        this.router.navigate(['/dashboard/statements']);
        break;
      case 'support':
        this.router.navigate(['/dashboard/support']);
        break;
      default:
        console.warn('[dashboard] Unknown quick action:', action);
    }
  }

  createNewAccount(): void {
    console.log('[dashboard] Creating new account');
    this.router.navigate(['/dashboard/accounts/new']);
    this.analyticsService.trackEvent('create_account_clicked');
  }

  viewAllAccounts(): void {
    console.log('[dashboard] Viewing all accounts');
    this.router.navigate(['/dashboard/accounts']);
    this.analyticsService.trackEvent('view_all_accounts');
  }

  viewAllTransactions(): void {
    console.log('[dashboard] Viewing all transactions');
    this.router.navigate(['/dashboard/transactions']);
    this.analyticsService.trackEvent('view_all_transactions');
  }

  private updateState(partial: Partial<DashboardState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }

  private showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Reintentar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    }).onAction().subscribe(() => {
      this.refreshData();
    });
  }

  private getAccountColor(type: string): string {
    const colors: Record<string, string> = {
      'CHECKING': '#1976d2',
      'SAVINGS': '#388e3c',
      'CREDIT': '#f57c00',
      'INVESTMENT': '#7b1fa2',
    };
    return colors[type] || '#757575';
  }

  trackByAccountId(index: number, account: Account): string {
    return account.id;
  }

  trackByTransactionId(index: number, transaction: Transaction): string {
    return transaction.id;
  }
}

// === ARCHIVO: mf-dashboard/webpack/webpack.config.js ===
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const path = require('path');

const microfrontendName = 'mf-dashboard';
const outputPath = process.env.MF_OUTPUT_PATH || path.resolve(__dirname, 'dist/mf-dashboard');
const publicHost = process.env.MF_PUBLIC_HOST || 'http://localhost:4201';

module.exports = withModuleFederationPlugin({
  name: microfrontendName,
  
  exposes: {
    './DashboardModule': './src/app/dashboard.module.ts',
    './DashboardComponent': './src/app/dashboard.component.ts',
  },

  remotes: {
    'shell': 'shell@http://localhost:4200/mf-manifest.json',
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/animations': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    '@angular/material': { singleton: true, strictVersion: true, requiredVersion: '20.2.0' },
    'rxjs': { singleton: true, strictVersion: true, requiredVersion: '7.8.0' },
    'single-spa': { singleton: true, strictVersion: true, requiredVersion: '6.0.0' },
    'zone.js': { singleton: true, strictVersion: true, requiredVersion: '0.14.2' },
  },

  filename: 'remoteEntry.js',
  exposesFederationAdapterAndPublicAPIs: true,
});

module.exports = {
  ...module.exports,
  output: {
    publicPath: `${publicHost}/`,
    path: outputPath,
  },
  devServer: {
    port: 4201,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@shell': path.resolve(__dirname, '../shell/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 20,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

// === ARCHIVO: mf-dashboard/src/app/services/account.service.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, catchError, retry, finalize, map, tap } from 'rxjs';
import { Account, Transaction, CreateAccountRequest, CreateAccountResponse, AccountService, AccountError } from '@shared/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceImpl implements AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/v1/accounts';
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;
  
  private accountsCache$ = new BehaviorSubject<Account[] | null>(null);
  private loadingState$ = new BehaviorSubject<boolean>(false);

  getAccounts(customerId: string): Observable<Account[]> {
    if (this.accountsCache$.value && this.accountsCache$.value.length > 0) {
      return new Observable(subscriber => {
        subscriber.next([...this.accountsCache$.value]);
        subscriber.complete();
      });
    }

    this.loadingState$.next(true);
    
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('includeDetails', 'true')
      .set('sortBy', 'createdAt')
      .set('sortOrder', 'desc');

    return this.http.get<Account[]>(`${this.apiUrl}`, { params }).pipe(
      tap(accounts => {
        this.accountsCache$.next(accounts);
        this.loadingState$.next(false);
        console.log(`[AccountService] Loaded ${accounts.length} accounts for customer ${customerId}`);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} after error`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  getAccountById(accountId: string): Observable<Account | null> {
    const cached = this.accountsCache$.value?.find(a => a.id === accountId);
    if (cached) {
      return new Observable(subscriber => {
        subscriber.next({ ...cached });
        subscriber.complete();
      });
    }

    return this.http.get<Account>(`${this.apiUrl}/${accountId}`).pipe(
      tap(account => console.log(`[AccountService] Retrieved account ${accountId}: ${account.accountNumber}`)),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for account ${accountId}`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  createAccount(request: CreateAccountRequest): Observable<CreateAccountResponse> {
    this.loadingState$.next(true);
    
    const payload = {
      ...request,
      requestedAt: new Date().toISOString(),
      channel: 'DIGITAL_MF_DASHBOARD'
    };

    return this.http.post<CreateAccountResponse>(`${this.apiUrl}`, payload).pipe(
      tap(response => {
        console.log(`[AccountService] Account created: ${response.accountId}`);
        this.invalidateCache();
        this.loadingState$.next(false);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for account creation`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  updateAccountStatus(accountId: string, status: 'ACTIVE' | 'FROZEN' | 'CLOSED'): Observable<boolean> {
    this.loadingState$.next(true);
    
    const payload = {
      status,
      updatedAt: new Date().toISOString(),
      source: 'MF_DASHBOARD'
    };

    return this.http.patch<{ success: boolean }>(`${this.apiUrl}/${accountId}/status`, payload).pipe(
      map(response => response.success),
      tap(success => {
        console.log(`[AccountService] Account ${accountId} status updated to ${status}: ${success}`);
        if (success) {
          this.invalidateCache();
        }
        this.loadingState$.next(false);
      }),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for status update`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.loadingState$.next(false))
    );
  }

  getTransactions(accountId: string, limit?: number): Observable<Transaction[]> {
    let params = new HttpParams().set('accountId', accountId);
    
    if (limit && limit > 0) {
      params = params.set('limit', limit.toString());
    } else {
      params = params.set('limit', '50');
    }

    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}/transactions`, { params }).pipe(
      tap(transactions => 
        console.log(`[AccountService] Loaded ${transactions.length} transactions for account ${accountId}`)
      ),
      retry({
        count: this.maxRetries,
        delay: (error, retryCount) => {
          console.warn(`[AccountService] Retry attempt ${retryCount} for transactions`);
          return new Observable(observer => {
            setTimeout(() => observer.next(), this.retryDelay * retryCount);
          });
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  isLoading(): Observable<boolean> {
    return this.loadingState$.asObservable();
  }

  clearCache(): void {
    this.invalidateCache();
  }

  private invalidateCache(): void {
    this.accountsCache$.next(null);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    let errorCode: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red: ${error.error.message}`;
      errorCode = 'NETWORK_ERROR';
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'El servicio de cuentas no está disponible';
          errorCode = 'SERVICE_UNAVAILABLE';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida';
          errorCode = 'BAD_REQUEST';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente';
          errorCode = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'No tiene permisos para acceder a este recurso';
          errorCode = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = error.error?.message || 'Recurso no encontrado';
          errorCode = 'NOT_FOUND';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Por favor, espere un momento';
          errorCode = 'RATE_LIMITED';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde';
          errorCode = 'INTERNAL_ERROR';
          break;
        case 503:
          errorMessage = 'Servicio temporalmente no disponible';
          errorCode = 'MAINTENANCE';
          break;
        default:
          errorMessage = error.error?.message || `Error desconocido: ${error.status}`;
          errorCode = 'UNKNOWN_ERROR';
      }
    }

    console.error(`[AccountService] Error ${errorCode}:`, errorMessage, error);
    
    const accountError = new AccountError(errorMessage, errorCode, error.status);
    return throwError(() => accountError);
  }
}

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Banca Digital - Shell</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Plataforma de banca digital con arquitectura de micro-frontends">
  <meta name="theme-color" content="#1976d2">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
  <noscript>
    <div style="padding: 40px; text-align: center; font-family: Roboto, sans-serif;">
      <h1>JavaScript Requerido</h1>
      <p>Por favor, habilite JavaScript en su navegador para utilizar esta aplicación de banca digital.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: shared/utils/auth.service.ts ===
import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, map, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
  customerId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

const TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  
  private readonly apiUrl = '/api/auth';
  private readonly tokenRefreshBuffer = 300000;
  
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _currentUser = signal<AuthUser | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  
  private refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  
  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly currentUser = computed(() => this._currentUser());
  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      this.initializeAuthState();
    }
  }

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    const expiry = this.getTokenExpiry();
    
    if (token && user && expiry && expiry > Date.now()) {
      this._isAuthenticated.set(true);
      this._currentUser.set(user);
      this.startRefreshTokenTimer();
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this._isLoading.set(true);
    this._error.set(null);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      finalize(() => this._isLoading.set(false))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getStoredRefreshToken();
    
    if (refreshToken) {
      return this.http.post<void>(`${this.apiUrl}/logout`, { refreshToken }).pipe(
        tap(() => this.clearAuthData()),
        catchError(() => {
          this.clearAuthData();
          return of(undefined);
        })
      );
    }
    
    this.clearAuthData();
    return of(undefined);
  }

  refreshToken(): Observable<AuthTokens | null> {
    const refreshToken = this.getStoredRefreshToken();
    
    if (!refreshToken) {
      return of(null);
    }
    
    if (this.refreshTokenSubject.value) {
      return this.refreshTokenSubject.pipe(
        switchMap(token => token ? this.http.post<AuthTokens>(`${this.apiUrl}/refresh`, { refreshToken: token }) : of(null))
      );
    }
    
    this.refreshTokenSubject.next(refreshToken);
    
    return this.http.post<AuthTokens>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(tokens => this.handleTokenRefresh(tokens)),
      catchError(error => {
        this.clearAuthData();
        return of(null);
      }),
      finalize(() => this.refreshTokenSubject.next(null))
    );
  }

  getAccessToken(): string | null {
    return this.getStoredToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  hasRole(role: string): boolean {
    const user = this._currentUser();
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this._currentUser();
    return user?.roles?.some(r => roles.includes(r)) ?? false;
  }

  updateUserProfile(updates: Partial<AuthUser>): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.apiUrl}/profile`, updates).pipe(
      tap(user => {
        this._currentUser.set(user);
        this.storeUser(user);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.getAccessToken();
    if (!token) {
      return of(false);
    }
    
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, { token }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.storeTokens(response.tokens);
    this.storeUser(response.user);
    this._isAuthenticated.set(true);
    this._currentUser.set(response.user);
    this.startRefreshTokenTimer();
    this.router.navigate(['/dashboard']);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error de autenticación';
    
    if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 403) {
      errorMessage = 'Acceso denegado';
    } else if (error.status === 0) {
      errorMessage = 'Error de conexión';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    
    this._error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private handleTokenRefresh(tokens: AuthTokens): void {
    this.storeTokens(tokens);
    this.startRefreshTokenTimer();
  }

  private startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer();
    
    const token = this.getStoredToken();
    const expiry = this.getTokenExpiry();
    
    if (token && expiry) {
      const timeout = expiry - Date.now() - this.tokenRefreshBuffer;
      
      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeout);
      } else {
        this.refreshToken().subscribe();
      }
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = null;
    }
  }

  private storeTokens(tokens: AuthTokens): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + tokens.expiresIn * 1000));
  }

  private storeUser(user: AuthUser): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private getStoredRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  private getStoredUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as AuthUser;
    } catch {
      return null;
    }
  }

  private getTokenExpiry(): number | null {
    if (!this.isBrowser) return null;
    
    const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryStr) return null;
    
    const expiry = parseInt(expiryStr, 10);
    return isNaN(expiry) ? null : expiry;
  }

  private clearAuthData(): void {
    if (!this.isBrowser) return;
    
    this.stopRefreshTokenTimer();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    this._error.set(null);
  }
}

// === ARCHIVO: shared/styles/_variables.scss ===
// ============================================
// Variables de diseño para consistencia visual
// ============================================

// Paleta de colores - Banco Digital
$color-primary: #1a365d;
$color-primary-light: #2c5282;
$color-primary-dark: #0d1f3c;
$color-primary-contrast: #ffffff;

$color-secondary: #2b6cb0;
$color-secondary-light: #4299e1;
$color-secondary-dark: #1e4e8c;

$color-accent: #38a169;
$color-accent-light: #48bb78;
$color-accent-dark: #2f855a;

$color-warning: #dd6b20;
$color-warning-light: #ed8936;
$color-warning-dark: #c05621;

$color-error: #e53e3e;
$color-error-light: #fc8181;
$color-error-dark: #c53030;

$color-info: #3182ce;
$color-info-light: #63b3ed;
$color-info-dark: #2b6cb0;

// Colores neutros
$color-gray-50: #f7fafc;
$color-gray-100: #edf2f7;
$color-gray-200: #e2e8f0;
$color-gray-300: #cbd5e0;
$color-gray-400: #a0aec0;
$color-gray-500: #718096;
$color-gray-600: #4a5568;
$color-gray-700: #2d3748;
$color-gray-800: #1a202c;
$color-gray-900: #171923;

// Colores de fondo
$bg-primary: #ffffff;
$bg-secondary: $color-gray-50;
$bg-tertiary: $color-gray-100;
$bg-overlay: rgba(0, 0, 0, 0.5);

// Colores de texto
$text-primary: $color-gray-800;
$text-secondary: $color-gray-600;
$text-tertiary: $color-gray-500;
$text-disabled: $color-gray-400;
$text-inverse: $color-primary-contrast;

// Bordes
$border-color: $color-gray-200;
$border-color-light: $color-gray-100;
$border-color-dark: $color-gray-300;
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$border-radius-xl: 16px;
$border-radius-full: 9999px;

// Sombras
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
$shadow-focus: 0 0 0 3px rgba(66, 153, 225, 0.5);

// Tipografía
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-family-heading: $font-family-base;
$font-family-mono: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;

$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;
$font-size-2xl: 1.5rem;
$font-size-3xl: 1.875rem;
$font-size-4xl: 2.25rem;
$font-size-5xl: 3rem;

$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.625;

// Espaciado
$spacing-0: 0;
$spacing-1: 0.25rem;
$spacing-2: 0.5rem;
$spacing-3: 0.75rem;
$spacing-4: 1rem;
$spacing-5: 1.25rem;
$spacing-6: 1.5rem;
$spacing-8: 2rem;
$spacing-10: 2.5rem;
$spacing-12: 3rem;
$spacing-16: 4rem;
$spacing-20: 5rem;
$spacing-24: 6rem;

// Breakpoints responsive
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// Z-index
$z-dropdown: 1000;
$z-sticky: 1020;
$z-fixed: 1030;
$z-modal-backdrop: 1040;
$z-modal: 1050;
$z-popover: 1060;
$z-tooltip: 1070;

// Transiciones
$transition-fast: 150ms ease-in-out;
$transition-base: 250ms ease-in-out;
$transition-slow: 350ms ease-in-out;
$transition-bounce: 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

// Layout
$sidebar-width: 260px;
$sidebar-width-collapsed: 72px;
$header-height: 64px;
$content-max-width: 1200px;

// Breakpoints map
$breakpoints: (
  'sm': $breakpoint-sm,
  'md': $breakpoint-md,
  'lg': $breakpoint-lg,
  'xl': $breakpoint-xl,
  '2xl': $breakpoint-2xl
);

// Colores de estado
$state-colors: (
  'success': (
    'base': $color-accent,
    'light': $color-accent-light,
    'dark': $color-accent-dark,
    'bg': rgba($color-accent, 0.1)
  ),
  'warning': (
    'base': $color-warning,
    'light': $color-warning-light,
    'dark': $color-warning-dark,
    'bg': rgba($color-warning, 0.1)
  ),
  'error': (
    'base': $color-error,
    'light': $color-error-light,
    'dark': $color-error-dark,
    'bg': rgba($color-error, 0.1)
  ),
  'info': (
    'base': $color-info,
    'light': $color-info-light,
    'dark': $color-info-dark,
    'bg': rgba($color-info, 0.1)
  )
);

// Mixins de utilidad
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin card-base {
  background: $bg-primary;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  padding: $spacing-6;
}

@mixin button-reset {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

// Funciones de utilidad
@function color-yiq($color) {
  $r: red($color);
  $g: green($color);
  $b: blue($color);
  
  $yiq: (($r * 299) + ($g * 587) + ($b * 114)) / 1000;
  
  @if ($yiq >= 128) {
    @return $text-primary;
  } @else {
    @return $text-inverse;
  }
}

@function rem($size) {
  $rem-size: $size / 16px;
  @return #{$rem-size}rem;
}

// === ARCHIVO: README.md ===
# Banco Digital - Arquitectura de Micro-Frontends

Este proyecto implementa una arquitectura de micro-frontends para una plataforma de banca digital, permitiendo a múltiples equipos desarrollar, probar y desplegar funcionalidades de forma independiente.

## Arquitectura

La solución utiliza **Module Federation** de Webpack junto con **single-spa** como orquestador para gestionar el ciclo de vida de los micro-frontends.

### Componentes

- **Shell (Container)**: Aplicación principal que orquestra la carga de micro-frontends y provee servicios compartidos.
- **MF-Dashboard**: Micro-frontend para el módulo de dashboard del cliente.
- **Shared**: Librería compartida con utilidades, estilos y servicios comunes.

### Estructura de Proyecto

```
├── shell/                    # Shell container (orquestador)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Servicios core, guards, interceptors
│   │   │   ├── shared/       # Componentes compartidos
│   │   │   └── features/     # Rutas y componentes de features
│   │   ├── assets/           # Configuración de micro-frontends
│   │   └── styles.scss
│   └── webpack/              # Configuración de Module Federation
│
├── mf-dashboard/             # Micro-frontend de dashboard
│   ├── src/
│   │   └── app/
│   │       ├── services/     # Servicios del dominio
│   │       └── components/   # Componentes del dashboard
│   └── webpack/
│
└── shared/                   # Código compartido
    ├── utils/                # Utilidades (auth, helpers)
    ├── styles/               # Variables y mixins globales
    └── models/               # Interfaces y tipos TypeScript
```

## Requisitos Previos

- Node.js 20.x o superior
- npm 10.x o superior
- Angular CLI 20.x

## Instalación

### 1. Instalar dependencias del Shell

```bash
cd shell
npm install
```

### 2. Instalar dependencias del Micro-frontend Dashboard

```bash
cd mf-dashboard
npm install
```

## Desarrollo

### Iniciar el Shell (Puerto 4200)

```bash
cd shell
npm start
```

El shell arrancará en `http://localhost:4200` y cargará automáticamente los micro-frontends configurados.

### Iniciar el Dashboard en modo desarrollo

```bash
cd mf-dashboard
npm start
```

El dashboard estará disponible en `http://localhost:4201` para pruebas independientes.

### Configurar Micro-frontends

La configuración de micro-frontends se encuentra en:

```
shell/src/assets/config/microfrontends.json
```

Ejemplo de configuración:

```json
{
  "dashboard": {
    "remoteEntry": "http://localhost:4201/remoteEntry.js",
    "exposedModule": "./DashboardModule"
  }
}
```

## Construcción

### Build del Shell

```bash
cd shell
npm run build
```

### Build del Dashboard

```bash
cd mf-dashboard
npm run build
```

### Build con Module Federation

```bash
cd shell
npm run build:single-spa
```

## Despliegue

### Preparación para Producción

1. Configurar las URLs de producción en `microfrontends.json`
2. Asegurar que los CDN estén configurados para servir los archivos estáticos
3. Ejecutar build de producción en cada micro-frontend
4. Desplegar los bundles a sus respectivos servidores/CDN

### Variables de Entorno

Crear archivo `.env` en cada proyecto:

```bash
# Shell
API_URL=https://api.bancodigital.com
MF_DASHBOARD_URL=https://dashboard.bancodigital.com

# Dashboard
API_URL=https://api.bancodigital.com
SHELL_URL=https://bancodigital.com
```

### Despliegue en CDN

Cada micro-frontend puede desplegarse de forma independiente. Asegurar que:
- Los archivos `remoteEntry.js` sean accesibles públicamente
- Los headers CORS permitan el acceso desde el dominio del shell
- Los hashes de contenido estén habilitados para cache busting

## Servicios Compartidos

### Autenticación

El servicio de autenticación está disponible en `shared/utils/auth.service.ts` y provee:
- Login/logout con JWT
- Refresh token automático
- Roles y permisos
- Estado reactivo con signals

Uso en componentes:

```typescript
import { AuthService } from '@shared/utils/auth.service';

@Component({...})
export class MiComponente {
  private auth = inject(AuthService);
  
  isAuthenticated = this.auth.isAuthenticated;
  currentUser = this.auth.currentUser;
  
  login(credentials: LoginCredentials) {
    this.auth.login(credentials).subscribe();
  }
}
```

### Estilos Compartidos

Las variables de diseño están en `shared/styles/_variables.scss` y se importan automáticamente en el shell.

```scss
@import 'shared/styles/variables';

.mi-componente {
  color: $color-primary;
  padding: $spacing-4;
}
```

## Testing

### Ejecutar tests

```bash
# Shell
cd shell
npm test

# Dashboard
cd mf-dashboard
npm test
```

## Consideraciones de Rendimiento

- **Lazy Loading**: Los micro-frontends se cargan bajo demanda según las rutas
- **Shared Dependencies**: Módulos comunes se comparten entre micro-frontends para evitar duplicación
- **Cache Strategy**: Los bundles usan content hashing para cache efectivo
- **Bundle Size**: Monitorear el tamaño de cada micro-frontend por separado

## Troubleshooting

### Error: Cannot find module

Verificar que todas las dependencias estén instaladas:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: CORS en micro-frontends

Asegurar que el servidor que sirve el micro-frontend tenga los headers CORS correctos:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: *
```

### Error: Module Federation

Verificar que las rutas en `microfrontends.json` apunten a URLs accesibles y que los `exposedModule` existan en el webpack config del micro-frontend remoto.

## Referencias

- [Angular Module Federation](https://github.com/angular-architects/module-federation)
- [single-spa](https://single-spa.js.org/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
```

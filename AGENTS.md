# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de una estrategia de micro-frontends en una arquitectura de banca digital**.

| | |
|---|---|
| Tema | Estrategias de micro-frontends |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 + Module Federation |
| Patron arquitectonico | micro-frontends con Module Federation y single-spa como orquestador |
| Tiempo estimado | 2 semanas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.2.0
- @angular/common 20.2.0
- @angular/router 20.2.0
- @angular/material 20.2.0
- single-spa 6.0.0
- @angular-architects/module-federation 20.0.0
- webpack 5.89.0
- typescript 5.4.2
- rxjs 7.8.0
- @angular/platform-browser-dynamic 20.2.0
- zone.js 0.14.2

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Exploración y definición del problema**: Documento de requisitos para la implementación de micro-frontends.
- **Fase 2 — Diseño de la arquitectura de micro-frontends**: Diagrama de la arquitectura de micro-frontends y documento de diseño.
- **Fase 3 — Implementación de un micro-frontend**: Código fuente del micro-frontend y documentación del proceso de implementación y despliegue.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (3)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `mf-dashboard/src/app/dashboard.component.ts` — `Account.map`
      Se invoca `map` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `mf-dashboard/src/app/dashboard.component.ts` — `Account.reduce`
      Se invoca `reduce` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `mf-dashboard/src/app/dashboard.component.ts` — `Account.slice`
      Se invoca `slice` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (24)

- `tsconfig.json`
- `shell/package.json`
- `shell/angular.json`
- `shared/models/account.model.ts`
- `shell/src/app/core/load-microfrontend.guard.ts`
- `shell/tsconfig.json`
- `shell/src/main.ts`
- `shell/src/app/app.module.ts`
- `shell/src/app/app.component.ts`
- `shell/webpack/webpack.config.js`
- `shell/src/assets/config/microfrontends.json`
- `mf-dashboard/package.json`
- `mf-dashboard/angular.json`
- `mf-dashboard/tsconfig.json`
- `mf-dashboard/src/main.ts`
- `mf-dashboard/src/bootstrap.ts`
- `mf-dashboard/src/app/dashboard.module.ts`
- `mf-dashboard/src/app/dashboard.component.ts`
- `mf-dashboard/webpack/webpack.config.js`
- `mf-dashboard/src/app/services/account.service.ts`
- `src/index.html`
- `shared/utils/auth.service.ts`
- `shared/styles/_variables.scss`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `shell/`
- `shell/src/`
- `shell/src/app/`
- `shell/src/assets/`
- `shell/src/environments/`
- `shell/webpack/`
- `mf-dashboard/`
- `mf-dashboard/src/`
- `mf-dashboard/src/app/`
- `mf-dashboard/src/assets/`
- `mf-dashboard/src/environments/`
- `mf-dashboard/webpack/`
- `shared/`
- `shared/utils/`
- `shared/models/`
- `shared/styles/`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **micro-frontends con Module Federation y single-spa como orquestador**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior
- Brecha que el reto ataca: Entiende cuándo usar micro-frontends y aplica alguna estrategia para solucionar un problema de negocio (frontends with shared or non-shared runtime)
- Mision: Candidato con experiencia como Senior en Backend Node y Frontend Angular, trabajando en arquitecturas complejas.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*

# Implementación de una estrategia de micro-frontends en una arquitectura de banca digital

La empresa de banca digital necesita mejorar la escalabilidad y mantenibilidad de su plataforma frontend. Actualmente, todos los frontends comparten un runtime, lo que dificulta la implementación de cambios y actualizaciones. El objetivo es implementar una estrategia de micro-frontends que permita a los equipos trabajar de forma independiente y desplegar sus cambios sin afectar a otros componentes. Los actores involucrados son el equipo de frontend, el equipo de backend y el equipo de operaciones. Las propiedades operativas clave son la consistencia de la UI, la latencia de carga de las páginas y la capacidad de desplegar cambios de forma independiente. El umbral de latencia aceptable es de 2 segundos para la carga inicial de cualquier página.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Estrategias de micro-frontends |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 2 semanas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Exploración y definición del problema

**Objetivo:** Identificar las limitaciones actuales del sistema frontend y definir los requisitos para la implementación de micro-frontends.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Analiza el sistema frontend actual y documenta sus limitaciones en términos de escalabilidad y mantenibilidad.
- Define los requisitos funcionales y no funcionales para la implementación de micro-frontends.

**Entregable:** Documento de requisitos para la implementación de micro-frontends.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las ventajas y desventajas de diferentes estrategias de micro-frontends.
- Piensa en cómo los equipos pueden trabajar de forma independiente sin afectar a otros componentes.

</details>

### Fase 2: Diseño de la arquitectura de micro-frontends

**Objetivo:** Diseñar la arquitectura de micro-frontends que cumpla con los requisitos definidos.

**Tiempo estimado:** 5 días

**Instrucciones:**

- Diseña la arquitectura de micro-frontends, incluyendo la definición de los micro-frontends individuales, la forma en que se integran y cómo se gestionan las dependencias.
- Considera diferentes estrategias de integración, como iframes, Web Components o Single SPA.

**Entregable:** Diagrama de la arquitectura de micro-frontends y documento de diseño.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga las mejores prácticas para la implementación de micro-frontends.
- Piensa en cómo gestionar las dependencias entre los micro-frontends.

</details>

### Fase 3: Implementación de un micro-frontend

**Objetivo:** Implementar un micro-frontend que cumpla con los requisitos de la arquitectura diseñada.

**Tiempo estimado:** 5 días

**Instrucciones:**

- Implementa un micro-frontend que cumpla con los requisitos de la arquitectura diseñada. Asegúrate de que el micro-frontend pueda ser desplegado de forma independiente y que no afecte a otros componentes.
- Documenta el proceso de implementación y despliegue del micro-frontend.

**Entregable:** Código fuente del micro-frontend y documentación del proceso de implementación y despliegue.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las herramientas y librerías adecuadas para la implementación del micro-frontend.
- Piensa en cómo asegurar que el micro-frontend pueda ser desplegado de forma independiente y que no afecte a otros componentes.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los micro-frontends y por qué se utilizan?
- **paraQueSirve**: ¿Cómo los micro-frontends resuelven los problemas de escalabilidad y mantenibilidad en el frontend de una plataforma de banca digital?
- **comoSeUsa**: ¿Cómo se implementa una estrategia de micro-frontends en una arquitectura de banca digital?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar micro-frontends y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones arquitectónicas y de diseño se deben tomar al implementar micro-frontends en una plataforma de banca digital?

## Criterios de Evaluacion

- Identificación correcta de las limitaciones del sistema frontend actual.
- Definición clara y completa de los requisitos para la implementación de micro-frontends.
- Diseño de una arquitectura de micro-frontends que cumpla con los requisitos definidos.
- Implementación correcta de un micro-frontend que pueda ser desplegado de forma independiente.
- Documentación clara y completa del proceso de implementación y despliegue del micro-frontend.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

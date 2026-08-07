# iAcademia — Contexto del proyecto

Plataforma educativa online con tutores IA, mercado inicial Argentina/hispanohablante.
Reemplaza o complementa la escuela tradicional (primaria y secundaria) con currículum
adaptativo y un tutor de IA por materia disponible 24/7.

**Última actualización:** 2026-08-07 · **Estado:** ~60% del alcance actual implementado

---

## 1. Identidad y propuesta de valor

- **Nombre:** iAcademia (nombre provisional descartado: "NeoEduIA")
- **Tagline histórico:** "Educación del futuro, hoy."
- El eje del producto es el **Tutor IA**: no reemplaza al docente, orienta y estructura
  el aprendizaje. Nunca diagnostica patologías clínicas ni decide por el alumno.
- Misión (heredada del documento fundacional): formar estudiantes autónomos, con
  pensamiento crítico y una relación consciente —no dependiente— con la IA.

## 2. Público objetivo

- Hijos de familias nómades (ejecutivos, diplomáticos, artistas, deportistas) y
  expatriados con movilidad laboral frecuente
- Familias que viajan por Latinoamérica (motorhome, etc.)
- Familias que buscan una alternativa moderna y estructurada a la escuela tradicional,
  sin competir por precio con plataformas masivas
- Estudiantes con necesidades educativas especiales (dislexia, TDAH, daltonismo)
- Estudiantes con materias previas o que necesitan apoyo escolar puntual
- Lanzamiento real acotado a mercado hispanohablante urbano: Argentina, España,
  México, Chile, Colombia

## 3. Modelo pedagógico (visión — parcialmente implementado)

- Metodología inspirada en los sistemas educativos de Finlandia, Singapur, Estonia,
  Canadá, Japón, Corea del Sur, Suiza y Países Bajos, adaptada a Latinoamérica
- Flujo de aprendizaje por tema: lectura (20 min) → práctica guiada con IA (20 min) →
  aplicación real (10 min) → repaso espaciado (1, 3, 7, 30 días)
- Evaluación formativa continua, sin notas numéricas rígidas — el error es insumo,
  no fracaso
- **Concepto de diseño a preservar como norte, aunque el código actual no lo
  implementa así:** "Días Pedagógicos Adaptativos" — en vez de un calendario fijo,
  cada tema tiene una secuencia de días (activación → exploración → comprensión →
  práctica → desafío → integración → creación → refuerzo condicional → evaluación)
  que el Tutor IA aplica según el progreso real, no la fecha
- El rol del Tutor IA cambia con la edad: más presencia y contención en grados
  bajos, más autonomía y "sparring intelectual" en los últimos años
- Diagnóstico de ingreso actual: estilo de aprendizaje, dislexia, TDAH, daltonismo,
  comprensión lectora, lógica (4 de 8 preguntas al azar) → genera adaptaciones
  automáticas (fuente grande, sesiones cortas, alto contraste, etc.)

## 4. Estructura académica

- Niveles: Primaria 1°-7°, Secundaria 1°-6° (primaria está en el modelo de datos
  pero **sin contenido curricular real todavía** — solo secundaria está poblada)
- Materias troncales/base: obligatorias según año y nivel, no se pueden quitar
- Materias optativas: elección libre, descuento por volumen
- Materias premium: especializadas de alto impacto profesional (medicina, derecho,
  ingeniería, IA y datos, etc.)
- 6 tutores IA con personalidad propia: Marcos (matemática), Ana (lengua), Laura
  (biología), Roberto (historia), Valeria (geografía), James (inglés)

## 5. Modelo de negocio y precios (`src/PreciosConfig.js`)

```javascript
BASE_MENSUAL: 6900          // +13% por cada año (1.13^(año-1))
OPTATIVA_MENSUAL: 1800
DESCUENTOS_OPTATIVAS: { 4: 0.10, 6: 0.15, 8: 0.20 }  // por cantidad de optativas
PREMIUM: 3500–5000          // según materia
OFERTA ANUAL: -15% sobre el total
```

- Modalidades a implementar: **Plan Completo** (reemplaza la escuela) / **Apoyo
  Escolar** (materias y temas puntuales) / **Por Horas** (consultas, exámenes)
- Descuento hermanos (2°: -20%, 3°: -35%), plan vacacional intensivo, plan
  preuniversitario, plan empresas/embajadas — todo pendiente
- **No hay plan gratuito.** Todo es pago desde el inicio.
- El diagnóstico de accesibilidad/estilo de aprendizaje se hace **después** del pago

### Reglas de edad en la inscripción (`Diagnostico.js`)
- Menor de 5 años: error, no válido
- Menor de 16: se puede inscribir, pero requiere datos del tutor/adulto responsable
- 16 años o más: inscripción autónoma
- Se envía confirmación por email al responsable cuando corresponde

## 6. Stack técnico y decisiones tomadas

| Capa | Decisión |
|---|---|
| Frontend | React 19 + Create React App + Tailwind 3 |
| Backend/DB | Firebase — Firestore + Authentication (proyecto `iacademia-a0f08`) |
| IA | Anthropic Claude API — **nunca desde el navegador**, siempre vía función serverless |
| Deploy | **Vercel es el deploy definitivo** — https://iacademia.vercel.app |
| Repo | https://github.com/iacademiaeduar/iacademia |
| Local | `C:\Users\ibarr\OneDrive\Desktop\iacademia` |

- La `ANTHROPIC_API_KEY` vive como variable de entorno **en Vercel**, nunca en el
  bundle de React. El proxy server-side está en `api/tutor.js`.
- La Firebase `apiKey` en `src/firebase.js` es pública por diseño (así funcionan
  las apps web de Firebase) — **no es un secreto**.
- **Reglas de Firestore**: versionadas en `firestore.rules` (raíz del proyecto).
  Cada usuario solo puede leer/escribir su propio doc en `usuarios/{uid}`. El
  archivo del repo es la fuente de verdad — hay que pegarlo a mano en la consola
  de Firebase (`iacademia-a0f08` → Firestore Database → Reglas) cada vez que
  cambie, Firebase no lo sincroniza solo desde el repo.
- Nota histórica: el documento de ideación original definió **Moodle + capa IA**
  como arquitectura técnica. Se terminó construyendo una app React custom en su
  lugar. Es una divergencia deliberada de Ismael respecto al plan escrito — no
  hay que "corregirla", solo tenerlo presente si alguna vez se discute LMS.

## 7. Estructura de archivos

```
src/
├── App.js                    # Router (useState, sin react-router) + Login + Dashboard
├── Diagnostico.js            # Flujo de inscripción de 14 pasos
├── PreciosConfig.js          # Lógica de precios y descuentos
├── MateriaDetalle.js         # Modal con info de materias (carreras, curiosidad)
├── Materias.js               # Vista de estudio: contenido + ejercicios
├── ContenidoEducativo.js     # Currículum: 6 materias × 6 años, 96 ejercicios
├── TutorIA.js                # Chat con tutor IA por materia
├── Progreso.js               # Estadísticas — HOY con datos hardcodeados
├── Logros.js                 # Sistema de logros — HOY con datos hardcodeados
├── PanelTutor.js             # Panel del responsable/tutor familiar
├── firebase.js                # Config Firebase (apiKey pública, no es secreto)
└── Diagnostico_backup.js     # CÓDIGO MUERTO — nadie lo importa, candidato a borrar
api/
└── tutor.js                  # Vercel serverless function — proxy a Anthropic
firestore.rules                # Reglas de Firestore — pegar a mano en la consola
```

`Diagnostico_backup.js` (845 líneas) no está importado en ningún lado. Confirmar
con Ismael antes de borrarlo, pero no tocarlo mientras tanto.

## 8. Estado real conocido (relevar antes de asumir que algo funciona)

- **Progreso real por materia**: `Materias.js` guarda en
  `usuarios/{uid}.progreso.{materiaId} = { completados: string[], desbloqueados: string[] }`
  (claves `"unidadId-temaId"`) vía `updateDoc`. Se deriva el `bloqueado`/`completo`/`pct`
  de cada tema/unidad sin mutar `ContenidoEducativo.js`. El estado sube a
  `App.js` (`usuario.progreso`) con el callback `onProgresoActualizado`, así que
  sobrevive a cambiar de pestaña dentro de la sesión — pero **no hay listener en
  vivo**, si abrís la app en dos pestañas no se sincronizan entre sí.
- **Dashboard con datos inventados**: "Nivel 4", XP, racha de 7 días, el
  calendario de actividad en `App.js` y `Progreso.js` siguen siendo constantes
  hardcodeadas — todavía no leen ni `usuario.progreso` ni Firestore.
- **Contenido balanceado en año 1** (149 ejercicios totales, antes 96): las 6
  materias tienen mínimo 4 ejercicios por tema en año 1 (matemática arranca con
  7 en su primer tema). **Años 2-6 siguen desbalanceados** (1-2 ejercicios por
  tema) — año 1 es el que usan los alumnos nuevos por defecto (`registrar()`
  setea `anio_escolar:1`), así que era la prioridad.
- **Sin routing real**: navegación 100% por `useState` (`pantalla`, `navActivo`),
  sin URLs compartibles ni botón "atrás".
- **Los botones "🧪 Ir directo a..." de `App.js` NO son login real**: solo
  setean `usuario` local sin pasar por Firebase Auth, así que `request.auth` es
  `null` y Firestore rechaza cualquier escritura con `permission-denied` — es lo
  esperado, no un bug de las reglas. Para probar escritura real hace falta un
  login real (registro o `signInWithEmailAndPassword`).
- **Vercel/CI**: `CI=true` en Vercel convierte warnings de ESLint en errores de
  build — **correr `npm run build` local antes de cada push** (ver §10).

## 9. Reglas de desarrollo

1. No hay plan gratuito: todo es pago desde el inicio
2. Las materias base son obligatorias según año y nivel, no se pueden quitar
3. El diagnóstico (accesibilidad/estilo de aprendizaje) se hace **después** del pago
4. Español rioplatense en toda la UI (vos, tu, che si aplica)
5. Mobile-first: el diseño debe funcionar en cualquier dispositivo
6. **Nunca** poner API keys de terceros (Anthropic, etc.) en código de frontend —
   siempre server-side vía `api/`
7. Correr `npm run build` localmente antes de cada push (Vercel usa `CI=true`,
   los warnings de ESLint rompen el build)
8. No mutar objetos importados de módulos (ej. `ContenidoEducativo.js`) desde
   componentes — usar `useState`/Firestore, nunca `objeto.propiedad = x` directo
   sobre datos importados

## 10. Comandos frecuentes

```bash
cd "C:\Users\ibarr\OneDrive\Desktop\iacademia"
npm start                 # desarrollo local
npm run build              # SIEMPRE antes de push — replica el build de Vercel
git add . && git commit -m "..." && git push
```

## 11. Errores conocidos

1. ~~`removeChild` en dev~~ — **resuelto 2026-08-07**: se sacó `React.StrictMode`
   de `index.js` (duplicaba renders en dev, gatillaba el error en árboles
   grandes) y se corrigió un render no determinístico en `Diagnostico.js`
   (`Math.random()` corriendo en cada render en vez de una vez al montar).
2. **Vercel build**: falla si hay warnings de ESLint sin resolver (`CI=true`).
3. ~~`onComplete` de `Diagnostico` no actualizaba `usuario` si Firestore fallaba~~
   — **resuelto 2026-08-07**: en `App.js`, `setUsuario(...)` estaba adentro del
   `try` después del `await setDoc(...)`. Si el `setDoc` fallaba (permission-denied,
   red, etc.), el `catch` absorbía el error y `setUsuario` nunca corría — el
   alumno terminaba el diagnóstico pero el dashboard quedaba con el `usuario`
   viejo (sin año, sin materias). Se movió `setUsuario` afuera del `try`, antes
   del `setDoc`, para que la UI siempre refleje lo que el alumno completó,
   independientemente de si el guardado remoto funciona.

## 12. Pendientes priorizados

### Fase 1 — Core educativo (en progreso)
- [x] Botones anidados en `Materias.js`
- [x] Warnings de ESLint que rompían el build de Vercel
- [x] Tutor IA conectado vía proxy server-side (`api/tutor.js`) — `ANTHROPIC_API_KEY`
      ya cargada en Vercel, activo en producción
- [x] Persistencia de sesión (`onAuthStateChanged` en `App.js`)
- [x] Bug de `removeChild` en dev (StrictMode + render no determinístico)
- [x] Reglas de Firestore endurecidas (`firestore.rules`) — pendiente que Ismael
      las pegue en la consola de Firebase (paso manual, no lo puede hacer Claude)
- [x] Progreso real guardado en Firestore (`usuarios/{uid}.progreso`, por materia)
- [x] Desbloqueo de temas al completar ejercicios (sin mutar el módulo importado)
- [ ] XP y logros reales (hoy `progreso` solo trackea completados/desbloqueados,
      no otorga XP ni logros — el dashboard sigue mostrando "Nivel 4" fijo)
- [ ] Repaso espaciado inteligente
- [x] Balancear ejercicios de año 1 (6 materias, mínimo 4 por tema — 149 totales)
- [ ] Balancear ejercicios de años 2-6 (siguen en 1-2 por tema, sin tocar)

### Fase 2 — Personalización
- [ ] Modalidades: Completo / Apoyo Escolar / Por Horas (agregar en inscripción)
- [ ] Adaptaciones activas para dislexia/TDAH/daltonismo visibles en el dashboard
- [ ] Selector de materias adicionales desde el dashboard (post-inscripción)
- [ ] Contenido para primaria (1°-7° grado) — hoy solo existe el modelo de datos

### Fase 3 — Certificación y Ministerio
- [ ] Evaluaciones formales por materia
- [ ] Constancias de avance en PDF con datos reales
- [ ] Alineación con NAP (Núcleos de Aprendizaje Prioritarios) argentinos
- [ ] Panel del tutor con reportes automáticos y descargables

### Fase 4 — Negocio y escala
- [ ] MercadoPago (integración real de pagos)
- [ ] Descuentos por hermanos automáticos
- [ ] Sistema de referidos
- [ ] Plan empresas y embajadas
- [ ] Dominio propio, app móvil / PWA

### Fase 5 — IA avanzada
- [ ] Generación dinámica de ejercicios por IA
- [ ] Diagnóstico continuo y adaptación del currículum
- [ ] Reportes inteligentes para tutores/familia

## 13. Nota sobre el PDF de ideación (`1 - IAcademia2.pdf`)

Es un log crudo de **1396 páginas / ~49.000 líneas**, resultado de concatenar
múltiples chats de ideación (no una spec única). Cosas útiles que aporta y que
no están en el código:

- El concepto de **"Días Pedagógicos Adaptativos"** (§3) como norte de diseño
- Los principios éticos del Tutor IA (nunca diagnostica, nunca decide por el
  alumno, transparencia funcional)
- El **Perfil del Egresado** (pensamiento crítico, autonomía, relación consciente
  con la IA) — útil para el tono de los prompts de los tutores IA

Cosas del PDF que **no reflejan el estado actual real** y no deben tomarse como
mandato:
- Define varias veces un MVP mucho más acotado (sin premium, sin optativas,
  1-3 grados de primaria) — el código ya construyó la versión "grande", eso es
  una decisión tomada de hecho, no hace falta revertirla
- Define Moodle como plataforma técnica — se optó por React custom
- No define precios finales (los $6.900/mes etc. son decisión posterior, fuera
  del documento)
- El diagnóstico de dislexia/TDAH/daltonismo como feature de ingreso tampoco
  está en el documento — es una decisión posterior de Ismael

No hace falta releer el PDF para trabajar en el proyecto de acá en más: este
archivo es la fuente de verdad operativa.

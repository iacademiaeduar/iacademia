# iAcademia — Contexto del proyecto

Plataforma educativa online con tutores IA, mercado inicial Argentina/hispanohablante.
Reemplaza o complementa la escuela tradicional (primaria y secundaria) con currículum
adaptativo y un tutor de IA por materia disponible 24/7.

**Última actualización:** 2026-08-08 · **Estado:** ~60% del alcance actual implementado

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
├── Diagnostico.js            # Flujo de inscripción — ~14-17 pasos según modalidad
├── diagnosticoData.js        # Datos estáticos del flujo (provincias, materias, precios,
│                              # pool de lógica, PASOS) — extraído de Diagnostico.js
├── diagnosticoUI.js          # Átomos de UI del flujo (Barra, Btn, Inp, Sel, Check, wrap, card)
│                              # — extraído de Diagnostico.js
├── PreciosConfig.js          # Lógica de precios: Plan Completo y Apoyo Escolar
├── MateriaDetalle.js         # Modal con info de materias (carreras, curiosidad)
├── Materias.js               # Vista de estudio: contenido + ejercicios
├── ContenidoEducativo.js     # Currículum: 6 materias × 6 años, 258 ejercicios
├── TutorIA.js                # Chat con tutor IA por materia
├── Progreso.js               # Estadísticas reales (XP, nivel, racha, logros)
├── Logros.js                 # Logros reales, derivados de gamificacion.js
├── gamificacion.js           # XP/nivel/logros — toda la lógica de cálculo, sin UI
├── gamificacion.test.js      # Tests unitarios de gamificacion.js (52 casos)
├── PreciosConfig.test.js     # Tests unitarios de PreciosConfig.js (Completo + Apoyo Escolar)
├── App.test.js               # Smoke test de App.js con Firebase mockeado
├── PanelTutor.js             # Panel del responsable/tutor familiar
├── firebase.js                # Config Firebase (apiKey pública, no es secreto)
└── Diagnostico_backup.js     # CÓDIGO MUERTO — nadie lo importa, candidato a borrar
api/
└── tutor.js                  # Vercel serverless function — proxy a Anthropic
firestore.rules                # Reglas de Firestore — pegar a mano en la consola
graphify-out/                  # Grafo de conocimiento del código (gitignored, local)
```

### Tests

`npm test` corre Jest + Testing Library (ya vienen con create-react-app, no se
agregó ninguna dependencia nueva). Cobertura actual:
- `gamificacion.test.js`: XP, nivel, títulos, % por materia, promedio general,
  ejercicios completados, y los 7 logros — incluye casos límite (cruce exacto
  de nivel, materia sin contenido, clave de tema inexistente).
- `PreciosConfig.test.js`: precio base compuesto por año, descuentos por
  volumen de optativas, fallback de precio para materias premium desconocidas.
- `App.test.js`: smoke test con `firebase/auth` y `firebase/firestore`
  mockeados — verifica que sin sesión activa se muestra el login (antes este
  archivo era el test default de CRA, roto desde que se reescribió App.js).

**Regla nueva**: cualquier función pura que se agregue a `gamificacion.js` o
`PreciosConfig.js` (o similar) debe llevar tests — son baratos de escribir y
es exactamente el tipo de código (aritmética, umbrales) donde un bug sutil no
se nota a simple vista ni testeando a mano en el navegador. `Diagnostico.js` y
`Materias.js` (los componentes grandes con más historial de bugs reales)
todavía no tienen tests — requieren mockear Firebase de forma más completa;
queda pendiente, no se hizo en esta pasada por proporción de esfuerzo.

`Diagnostico_backup.js` (845 líneas) no está importado en ningún lado. Confirmar
con Ismael antes de borrarlo, pero no tocarlo mientras tanto.

## 8. Estado real conocido (relevar antes de asumir que algo funciona)

- **Modalidades de inscripción** (`Diagnostico.js`, paso "modalidad" — nuevo,
  entre `aviso_legal` y `datos_alumno`):
  - **Plan Completo** (`alumno.modalidad='completo'`): el flujo de siempre —
    materias base obligatorias + optativas + premium, precio por año con
    +13% compuesto.
  - **Apoyo Escolar** (`alumno.modalidad='apoyo_escolar'`): el alumno elige
    materias puntuales (solo las 6 con contenido real de `ContenidoEducativo.js`,
    no toda la lista de `MATERIAS_BASE`), sin base/optativas/premium, a
    `PRECIOS.APOYO_ESCOLAR_MENSUAL` ($2900) por materia
    (`calcularResumenApoyoEscolar` en `PreciosConfig.js`). Se guarda en
    `usuario.materias_apoyo_escolar` (array de ids, no nombres). `Materias.js`
    y el grid "Mis materias" de `App.js` (Inicio) filtran por esta lista en
    vez de mostrar las 6 por defecto — **si se toca cualquiera de esos dos
    lugares, hay que mantener el filtro en los dos, no alcanza con uno solo**
    (bug real encontrado y corregido en esta misma pasada: el grid de Inicio
    seguía mostrando las 6 aunque el sidebar de Materias.js ya filtraba bien).
  - **Por Horas** (`alumno.modalidad='por_horas'`): placeholder honesto —
    pantalla "¡Ya casi!" que dice que todavía se está armando, no hay sistema
    de reserva ni de facturación por hora. No fingir que existe.
  - `pantalla==='materias'` y `pantalla==='checkout'` tienen ramas separadas
    por modalidad (`&& alumno.modalidad==='apoyo_escolar'` matchea primero).
    Al agregar una modalidad nueva o tocar precios, revisar ambas pantallas.
  - De paso se corrigió un bug preexistente: el botón "Editar selección" del
    checkout hacía `setPaso(p => p - 2)`, un offset mágico que en realidad
    apuntaba a `datos_tutor`, no a `materias`. Se cambió a
    `setPaso(PASOS.indexOf('materias'))` — inmune a que se inserten o saquen
    pasos en el medio.
- **Adaptaciones de accesibilidad**: `Diagnostico.js` calcula `usuario.adaptaciones`
  (array de strings: `fuente grande`, `audio texto`, `espaciado extra` si
  dislexia; `sesiones cortas`, `más pausas`, `gamificación extra` si TDAH;
  `alto contraste` si daltonismo; `explicaciones simples`, `más ejemplos` si
  comprensión baja). `App.js` aplica clases CSS en `<html>` (`index.css`,
  `ADAPTACIONES_CON_EFECTO`) para las 3 que tienen efecto real:
  `fuente grande` (escala el `font-size` del `<html>`, y como Tailwind usa
  rem todos los `text-*` del sitio escalan solos), `alto contraste` (CSS
  `filter: contrast()`), `espaciado extra` (`letter-spacing`/`line-height`).
  Las otras 5 (`audio texto`, `sesiones cortas`, `más pausas`, `gamificación
  extra`, `explicaciones simples`, `más ejemplos`) se muestran en el panel
  "Adaptaciones activas" del dashboard marcadas 🛠️ (detectadas, sin efecto
  real todavía) — **no fingir que están implementadas** si se toca este código.
- **Progreso real por materia**: `Materias.js` guarda en
  `usuarios/{uid}.progreso.{materiaId} = { completados: string[], desbloqueados: string[] }`
  (claves `"unidadId-temaId"`) vía `updateDoc`. Se deriva el `bloqueado`/`completo`/`pct`
  de cada tema/unidad sin mutar `ContenidoEducativo.js`. El estado sube a
  `App.js` (`usuario.progreso`) con el callback `onProgresoActualizado`, así que
  sobrevive a cambiar de pestaña dentro de la sesión — pero **no hay listener en
  vivo**, si abrís la app en dos pestañas no se sincronizan entre sí.
- **XP, nivel, logros y racha reales** (`gamificacion.js`): XP = 50 por tema
  completado (`XP_POR_TEMA`), nivel = cada 500 XP (`XP_POR_NIVEL`). 7 logros
  definidos como funciones de `usuario.progreso`/`usuario.racha_dias` — ninguno
  hardcodeado como obtenido. La racha (`usuario.racha_dias` +
  `usuario.ultima_actividad`, fecha `YYYY-MM-DD`) se actualiza una vez por
  sesión en `App.js` al entrar al dashboard: +1 si la última actividad fue
  ayer, reinicia a 1 si no. El calendario "actividad de 5 semanas" que había en
  `Progreso.js` se sacó porque no hay datos reales de actividad día a día para
  llenarlo (solo un contador de racha) — se reemplazó por una tarjeta simple
  con la racha real.
- **Contenido balanceado en todos los años** (258 ejercicios totales, antes 96):
  las 6 materias tienen mínimo 4 ejercicios por tema en los 6 años de secundaria
  (los temas más ricos como matemática año1/año3 "Fórmula resolvente" quedaron
  con 7, sin tocar). Verificado con script: opciones válidas (4 por ejercicio),
  `correcta` en rango, cero preguntas duplicadas.
- **Sin routing real**: navegación 100% por `useState` (`pantalla`, `navActivo`),
  sin URLs compartibles ni botón "atrás".
- **Los botones "🧪 Ir directo a..." de `App.js` NO son login real**: solo
  setean `usuario` local sin pasar por Firebase Auth, así que `request.auth` es
  `null` y Firestore rechaza cualquier escritura con `permission-denied` — es lo
  esperado, no un bug de las reglas. Para probar escritura real hace falta un
  login real (registro o `signInWithEmailAndPassword`).
- **Vercel/CI**: `CI=true` en Vercel convierte warnings de ESLint en errores de
  build — **correr `npm run build` local antes de cada push** (ver §10).
- **🟡 Riesgo estructural — `Diagnostico.js` sigue siendo un god-component,
  parcialmente mitigado**: se extrajeron los datos estáticos
  (`diagnosticoData.js`) y los átomos de UI (`diagnosticoUI.js`), pero los
  ~17 pasos (`if(pantalla===...)`) y todo el estado (`alumno`, `tutor`,
  `diag`, `optativasSel`, `premiumSel`, `apoyoEscolarSel`, etc.) siguen en un
  solo componente. Partir los pasos en componentes separados requeriría
  Context o pasar ~20 props a cada uno — no se hizo en esta pasada por
  proporción de esfuerzo. Ya causó al menos un bug real (el de
  `onComplete`/`setUsuario`, ver §11) y otro bug preexistente que se encontró
  y corrigió recién (el offset mágico de "Editar selección", ver arriba).
  Si el archivo vuelve a crecer mucho al sumar contenido real a "Por Horas"
  o al iterar Modalidades, ahí sí conviene la partición completa.
- **Agregar materias post-inscripción (solo Apoyo Escolar)**: `Materias.js`
  tiene un botón "+ Agregar materia" en el sidebar (visible solo si
  `usuario.modalidad==='apoyo_escolar'` y quedan materias de las 6 sin
  elegir). Abre un modal, calcula el impacto de precio con
  `calcularResumenApoyoEscolar` (informativo, no hay cobro real todavía) y al
  confirmar hace `updateDoc` de `usuario.materias_apoyo_escolar` + sube el
  cambio a `App.js` vía el nuevo callback `onMateriasActualizadas` — mismo
  patrón que `onProgresoActualizado`, estado local primero y Firestore
  después (ver bug de `onComplete` en §11, por poco se repite acá). **Plan
  Completo NO tiene selector de optativas/premium post-inscripción todavía**
  — quedó fuera de esta pasada a propósito: reutilizar `OPTATIVAS`/
  `PREMIUM_LIST` de `diagnosticoData.js` con la elegibilidad por año y el
  descuento por volumen es una feature más grande, ver §12.

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
9. Toda función pura nueva en `gamificacion.js`/`PreciosConfig.js` lleva tests
   (`npm test`) — ver §7 "Tests"
10. No dejar parámetros de función sin usar (ej. el `OPTATIVAS`/`PREMIUM` que
    tenía `calcularResumen` y nunca leía — limpiado 2026-08-08). Un parámetro
    que aparenta ser necesario y no lo es engaña al próximo que lea el código.

## 10. Comandos frecuentes

```bash
cd "C:\Users\ibarr\OneDrive\Desktop\iacademia"
npm start                 # desarrollo local
npm test                   # correr los tests (Jest + Testing Library)
npm run build              # SIEMPRE antes de push — replica el build de Vercel
git add . && git commit -m "..." && git push
```

Hay un grafo de conocimiento del código generado con `graphify` en
`graphify-out/` (gitignored, local — no se sube). Se regenera con
`/graphify --update` si hace falta después de cambios grandes.

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
- [x] XP y logros reales (`gamificacion.js` — ver §8)
- [ ] Repaso espaciado inteligente
- [ ] Tracking de actividad día a día (hoy solo hay un contador de racha
      agregado, no hay calendario real — se sacó el que estaba porque era
      inventado, ver §8)
- [x] Balancear ejercicios de todos los años (6 materias × 6 años, mínimo 4 por
      tema — 258 totales, ver §8)
- [x] Tests automatizados para la lógica pura (`gamificacion.js`,
      `PreciosConfig.js`) + smoke test de `App.js` — 52 tests, ver §7 "Tests"
- [x] Limpieza: parámetros muertos en `calcularResumen` (`OPTATIVAS`/`PREMIUM`
      nunca se usaban)
- [x] Extraer datos estáticos y átomos de UI de `Diagnostico.js` a
      `diagnosticoData.js`/`diagnosticoUI.js` (mitigación parcial del
      god-component, ver §9 — falta partir los ~17 pasos en sí)
- [ ] Tests de integración para `Diagnostico.js`/`Materias.js` — los
      componentes grandes con más historial de bugs reales siguen sin
      cobertura (requiere mockear Firebase más a fondo)

### Fase 2 — Personalización
- [x] Modalidades: **Plan Completo** y **Apoyo Escolar** funcionando de punta
      a punta (paso "modalidad" en `Diagnostico.js`, pricing en
      `PreciosConfig.js`, filtrado por materia en `Materias.js` y `App.js` —
      ver §8). **Por Horas** es un placeholder honesto ("todavía la estamos
      armando"), no hay sistema de reserva ni facturación por hora.
- [x] Adaptaciones activas para dislexia/TDAH/daltonismo visibles en el
      dashboard — ver §8 "Adaptaciones de accesibilidad"
- [x] Selector de materias adicionales desde el dashboard — **solo Apoyo
      Escolar** (ver §8). Falta el equivalente para Plan Completo: agregar
      optativas/premium post-inscripción reutilizando la lógica de
      elegibilidad por año y descuento por volumen de `diagnosticoData.js`.
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

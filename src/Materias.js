import React, { useState } from 'react';

const CONTENIDO = {
  matematica: {
    nombre: 'Matemática', emoji: '🧮', color: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-600',
    unidades: [
      {
        id: 1, titulo: 'Números naturales y operaciones', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'Números hasta el 10.000', completo: false, activo: true,
            contenido: 'Los números naturales son los que usamos para contar. Hasta el 10.000 organizamos los números en unidades, decenas, centenas y unidades de mil. Por ejemplo: 3.456 tiene 3 unidades de mil, 4 centenas, 5 decenas y 6 unidades.',
            formula: '3.456 = 3.000 + 400 + 50 + 6',
            ejercicios: [
              { pregunta: '¿Cuántas centenas tiene el número 2.738?', opciones: ['2', '7', '3', '8'], correcta: 1, exp: 'El dígito 7 está en la posición de las centenas, por lo tanto tiene 7 centenas.' },
              { pregunta: '¿Cuál es el mayor número de 4 cifras?', opciones: ['1000', '9999', '9990', '9909'], correcta: 1, exp: '9999 es el mayor número de 4 cifras.' },
              { pregunta: 'Descomponé 5.204: ¿cuántas unidades de mil tiene?', opciones: ['2', '0', '5', '4'], correcta: 2, exp: 'El 5 está en la posición de las unidades de mil.' },
            ]
          },
          { id: 2, titulo: 'Suma y resta con llevada', completo: false, bloqueado: true,
            contenido: 'Cuando sumamos y el resultado de una columna supera 9, llevamos una unidad a la columna siguiente. Lo mismo en la resta, pedimos prestado a la columna siguiente.',
            formula: '   456\n+  378\n------\n   834',
            ejercicios: [
              { pregunta: '456 + 378 = ?', opciones: ['724', '834', '824', '734'], correcta: 1, exp: '6+8=14 escribo 4 llevo 1. 5+7+1=13 escribo 3 llevo 1. 4+3+1=8. Resultado: 834.' },
              { pregunta: '502 - 347 = ?', opciones: ['155', '165', '255', '145'], correcta: 0, exp: '502 - 347 = 155. Verificá: 155 + 347 = 502.' },
            ]
          },
          { id: 3, titulo: 'Multiplicación', completo: false, bloqueado: true,
            contenido: 'La multiplicación es una suma repetida. 4 × 3 significa sumar 4 tres veces: 4+4+4=12. Las tablas de multiplicar son la base para resolver multiplicaciones más complejas.',
            formula: '4 × 3 = 12',
            ejercicios: [
              { pregunta: '7 × 8 = ?', opciones: ['54', '56', '63', '48'], correcta: 1, exp: '7 × 8 = 56. Es parte de las tablas del 7 y del 8.' },
              { pregunta: '¿Cuánto es 6 × 9?', opciones: ['54', '56', '45', '63'], correcta: 0, exp: '6 × 9 = 54.' },
            ]
          },
          { id: 4, titulo: 'División exacta y con resto', completo: false, bloqueado: true,
            contenido: 'Dividir es repartir en partes iguales. En 20 ÷ 4 = 5, estamos repartiendo 20 en 4 grupos iguales de 5. Cuando no se puede repartir exactamente, hay un resto.',
            formula: '23 ÷ 4 = 5 (resto 3)',
            ejercicios: [
              { pregunta: '36 ÷ 6 = ?', opciones: ['5', '6', '7', '8'], correcta: 1, exp: '36 ÷ 6 = 6, porque 6 × 6 = 36.' },
              { pregunta: '25 ÷ 4: ¿cuál es el resto?', opciones: ['0', '1', '2', '3'], correcta: 1, exp: '4 × 6 = 24, resto 1. Verificá: 4 × 6 + 1 = 25.' },
            ]
          },
        ]
      },
      {
        id: 2, titulo: 'Fracciones', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: '¿Qué es una fracción?', completo: false, activo: false,
            contenido: 'Una fracción representa una parte de un entero. El número de abajo (denominador) indica en cuántas partes iguales se dividió el entero. El de arriba (numerador) indica cuántas partes tomamos.',
            formula: '3/4 = 3 de 4 partes iguales',
            ejercicios: [
              { pregunta: '¿Qué fracción representa la mitad?', opciones: ['1/4', '1/3', '1/2', '2/3'], correcta: 2, exp: 'La mitad se representa como 1/2, que significa 1 parte de 2 iguales.' },
            ]
          },
          { id: 2, titulo: 'Suma de fracciones', completo: false, bloqueado: true,
            contenido: 'Para sumar fracciones con el mismo denominador, sumamos los numeradores y mantenemos el denominador. Si los denominadores son distintos, primero los igualamos.',
            formula: '1/4 + 2/4 = 3/4',
            ejercicios: [
              { pregunta: '2/5 + 1/5 = ?', opciones: ['3/10', '3/5', '2/5', '1/5'], correcta: 1, exp: 'Mismo denominador: sumamos numeradores. 2+1=3, denominador 5. Resultado: 3/5.' },
            ]
          },
        ]
      },
      {
        id: 3, titulo: 'Geometría básica', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Figuras planas', completo: false, activo: false,
            contenido: 'Las figuras planas son aquellas que tienen solo dos dimensiones: largo y ancho. Las más comunes son el triángulo (3 lados), el cuadrado (4 lados iguales), el rectángulo (4 lados, lados opuestos iguales) y el círculo.',
            formula: 'Perímetro del cuadrado = lado × 4',
            ejercicios: [
              { pregunta: '¿Cuántos lados tiene un hexágono?', opciones: ['5', '6', '7', '8'], correcta: 1, exp: 'Hexa significa 6 en griego. Un hexágono tiene 6 lados.' },
              { pregunta: 'Un cuadrado tiene lados de 5 cm. ¿Cuál es su perímetro?', opciones: ['10 cm', '15 cm', '20 cm', '25 cm'], correcta: 2, exp: 'Perímetro = 5 × 4 = 20 cm.' },
            ]
          },
          { id: 2, titulo: 'Perímetro y área', completo: false, bloqueado: true,
            contenido: 'El perímetro es la suma de todos los lados de una figura. El área es la superficie que ocupa. Para el rectángulo: Área = base × altura.',
            formula: 'Área del rectángulo = base × altura',
            ejercicios: [
              { pregunta: 'Un rectángulo tiene base 8 cm y altura 3 cm. ¿Cuál es su área?', opciones: ['11 cm²', '22 cm²', '24 cm²', '16 cm²'], correcta: 2, exp: 'Área = 8 × 3 = 24 cm².' },
            ]
          },
        ]
      },
      {
        id: 4, titulo: 'Algebra básica', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Ecuaciones simples', completo: false, activo: false,
            contenido: 'Una ecuación es una igualdad donde hay una incógnita (letra) que debemos encontrar. Para resolverla, despejamos la incógnita haciendo la operación inversa en ambos lados.',
            formula: 'x + 5 = 12 → x = 12 - 5 → x = 7',
            ejercicios: [
              { pregunta: 'x + 8 = 15. ¿Cuánto vale x?', opciones: ['5', '6', '7', '8'], correcta: 2, exp: 'x = 15 - 8 = 7. Verificá: 7 + 8 = 15.' },
              { pregunta: '2x = 14. ¿Cuánto vale x?', opciones: ['5', '6', '7', '8'], correcta: 2, exp: 'x = 14 ÷ 2 = 7. Verificá: 2 × 7 = 14.' },
            ]
          },
        ]
      },
    ]
  },
  lengua: {
    nombre: 'Lengua y Literatura', emoji: '📖', color: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-600',
    unidades: [
      {
        id: 1, titulo: 'Comprensión lectora', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'Tipos de texto', completo: false, activo: true,
            contenido: 'Los textos se clasifican según su propósito. Los textos narrativos cuentan historias. Los descriptivos describen personas, lugares u objetos. Los informativos explican datos reales. Los argumentativos buscan convencer al lector.',
            formula: 'Narrativo → cuenta | Descriptivo → describe | Informativo → explica',
            ejercicios: [
              { pregunta: '¿Qué tipo de texto es una noticia periodística?', opciones: ['Narrativo', 'Descriptivo', 'Informativo', 'Argumentativo'], correcta: 2, exp: 'Una noticia busca informar hechos reales. Es un texto informativo.' },
              { pregunta: '¿Qué tipo de texto es un cuento?', opciones: ['Narrativo', 'Descriptivo', 'Informativo', 'Argumentativo'], correcta: 0, exp: 'El cuento narra una historia con personajes y trama. Es narrativo.' },
            ]
          },
          { id: 2, titulo: 'Idea principal y secundaria', completo: false, bloqueado: true,
            contenido: 'La idea principal es el mensaje más importante del texto. Las ideas secundarias amplían, explican o ejemplifican la idea principal. Para encontrar la idea principal preguntate: ¿de qué trata principalmente el texto?',
            formula: 'Idea principal → ¿De qué trata? | Ideas secundarias → detalles',
            ejercicios: [
              { pregunta: 'En un texto sobre el agua, ¿cuál sería la idea principal?', opciones: ['El agua es azul', 'El agua es esencial para la vida', 'Los ríos son profundos', 'El mar tiene sal'], correcta: 1, exp: 'La idea más importante e integradora es que el agua es esencial para la vida.' },
            ]
          },
        ]
      },
      {
        id: 2, titulo: 'Gramática y ortografía', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Sustantivos y adjetivos', completo: false, activo: false,
            contenido: 'Los sustantivos son palabras que nombran personas, animales, cosas o lugares. Los adjetivos describen o califican a los sustantivos. El adjetivo concuerda en género y número con el sustantivo.',
            formula: 'Casa (sustantivo) → grande (adjetivo)',
            ejercicios: [
              { pregunta: '¿Cuál de estas palabras es un sustantivo?', opciones: ['correr', 'árbol', 'rápido', 'felizmente'], correcta: 1, exp: 'Árbol es un sustantivo porque nombra una cosa.' },
              { pregunta: '¿Cuál es el adjetivo en "el perro negro"?', opciones: ['el', 'perro', 'negro', 'ninguno'], correcta: 2, exp: 'Negro es el adjetivo porque describe al sustantivo perro.' },
            ]
          },
          { id: 2, titulo: 'El verbo y los tiempos verbales', completo: false, bloqueado: true,
            contenido: 'El verbo expresa acciones, estados o procesos. Los tiempos verbales indican cuándo ocurre la acción: pasado (corrí), presente (corro), futuro (correré).',
            formula: 'Pasado → corrí | Presente → corro | Futuro → correré',
            ejercicios: [
              { pregunta: '"Mañana estudiaré" está en tiempo...', opciones: ['Pasado', 'Presente', 'Futuro', 'Ninguno'], correcta: 2, exp: '"Estudiaré" indica una acción que ocurrirá en el futuro.' },
            ]
          },
        ]
      },
      {
        id: 3, titulo: 'Literatura y narrativa', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'El cuento: estructura', completo: false, activo: false,
            contenido: 'El cuento tiene tres partes: inicio (se presentan los personajes y el contexto), nudo (surge el conflicto o problema principal) y desenlace (se resuelve el conflicto).',
            formula: 'Inicio → Nudo → Desenlace',
            ejercicios: [
              { pregunta: '¿En qué parte del cuento aparece el conflicto principal?', opciones: ['Inicio', 'Nudo', 'Desenlace', 'En ninguna'], correcta: 1, exp: 'El nudo es donde surge y se desarrolla el conflicto principal.' },
            ]
          },
        ]
      },
    ]
  },
  biologia: {
    nombre: 'Biología', emoji: '🔬', color: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-600',
    unidades: [
      {
        id: 1, titulo: 'La célula', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'Célula procariota y eucariota', completo: false, activo: true,
            contenido: 'Las células procariotas son las más simples, no tienen núcleo definido. Son características de las bacterias. Las células eucariotas tienen núcleo bien definido y organelas especializadas. Son las células de plantas, animales y hongos.',
            formula: 'Procariota → sin núcleo | Eucariota → con núcleo',
            ejercicios: [
              { pregunta: '¿Qué tipo de célula tienen las bacterias?', opciones: ['Eucariota', 'Procariota', 'Animal', 'Vegetal'], correcta: 1, exp: 'Las bacterias son organismos procariotas: no tienen núcleo definido.' },
              { pregunta: '¿Qué distingue a una célula eucariota?', opciones: ['No tiene membrana', 'Tiene núcleo definido', 'Es más pequeña', 'No tiene ADN'], correcta: 1, exp: 'La célula eucariota tiene un núcleo bien definido que contiene el ADN.' },
            ]
          },
          { id: 2, titulo: 'Orgánulos celulares', completo: false, bloqueado: true,
            contenido: 'Los orgánulos son estructuras dentro de la célula con funciones específicas. El núcleo contiene el ADN. Las mitocondrias producen energía. El ribosoma fabrica proteínas. El cloroplasto realiza la fotosíntesis (solo en plantas).',
            formula: 'Mitocondria → energía | Ribosoma → proteínas | Cloroplasto → fotosíntesis',
            ejercicios: [
              { pregunta: '¿Qué orgánulo produce energía en la célula?', opciones: ['Núcleo', 'Ribosoma', 'Mitocondria', 'Cloroplasto'], correcta: 2, exp: 'La mitocondria es la central energética de la célula.' },
              { pregunta: '¿Qué orgánulo es exclusivo de las células vegetales?', opciones: ['Mitocondria', 'Ribosoma', 'Núcleo', 'Cloroplasto'], correcta: 3, exp: 'El cloroplasto solo está en células vegetales y realiza la fotosíntesis.' },
            ]
          },
          { id: 3, titulo: 'División celular', completo: false, bloqueado: true,
            contenido: 'Las células se reproducen por división. La mitosis produce dos células hijas idénticas a la célula madre (crecimiento y reparación). La meiosis produce cuatro células con la mitad del material genético (reproducción sexual).',
            formula: 'Mitosis → 2 células iguales | Meiosis → 4 células con ½ ADN',
            ejercicios: [
              { pregunta: '¿Qué tipo de división produce células para el crecimiento?', opciones: ['Meiosis', 'Mitosis', 'Fisión', 'Gemación'], correcta: 1, exp: 'La mitosis produce células idénticas para el crecimiento y reparación.' },
            ]
          },
        ]
      },
      {
        id: 2, titulo: 'El cuerpo humano', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Sistemas del cuerpo', completo: false, activo: false,
            contenido: 'El cuerpo humano está organizado en sistemas. El sistema digestivo procesa los alimentos. El circulatorio transporta sangre. El respiratorio toma oxígeno. El nervioso coordina las funciones. El esquelético da estructura y soporte.',
            formula: 'Digestivo → alimentos | Circulatorio → sangre | Respiratorio → oxígeno',
            ejercicios: [
              { pregunta: '¿Qué sistema transporta la sangre por el cuerpo?', opciones: ['Digestivo', 'Nervioso', 'Circulatorio', 'Respiratorio'], correcta: 2, exp: 'El sistema circulatorio, formado por el corazón y los vasos sanguíneos, transporta la sangre.' },
            ]
          },
        ]
      },
    ]
  },
  historia: {
    nombre: 'Historia', emoji: '🗺️', color: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-600',
    unidades: [
      {
        id: 1, titulo: 'Prehistoria y civilizaciones antiguas', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'La Prehistoria', completo: false, activo: true,
            contenido: 'La Prehistoria es el período anterior a la escritura. Se divide en Paleolítico (uso de herramientas de piedra tallada, nómades, cazadores-recolectores) y Neolítico (agricultura, ganadería, vida sedentaria, cerámica).',
            formula: 'Paleolítico → nómade | Neolítico → sedentario + agricultura',
            ejercicios: [
              { pregunta: '¿Qué actividad caracterizó al ser humano del Paleolítico?', opciones: ['Agricultura', 'Comercio', 'Caza y recolección', 'Construcción de ciudades'], correcta: 2, exp: 'En el Paleolítico los humanos eran nómades que vivían de la caza y la recolección.' },
              { pregunta: '¿Qué gran cambio ocurrió en el Neolítico?', opciones: ['Uso del fuego', 'Aparición de la escritura', 'La agricultura y vida sedentaria', 'La metalurgia'], correcta: 2, exp: 'La revolución neolítica implicó el surgimiento de la agricultura y el sedentarismo.' },
            ]
          },
          { id: 2, titulo: 'Mesopotamia y Egipto', completo: false, bloqueado: true,
            contenido: 'Mesopotamia (entre los ríos Tigris y Éufrates) fue una de las primeras civilizaciones. Inventaron la escritura cuneiforme. Egipto se desarrolló a orillas del Nilo, con una sociedad organizada por el faraón y una cultura de gran legado arquitectónico (pirámides).',
            formula: 'Mesopotamia → escritura cuneiforme | Egipto → jeroglíficos + pirámides',
            ejercicios: [
              { pregunta: '¿Qué tipo de escritura inventaron en Mesopotamia?', opciones: ['Jeroglífica', 'Cuneiforme', 'Alfabética', 'Pictográfica'], correcta: 1, exp: 'Los sumerios de Mesopotamia inventaron la escritura cuneiforme.' },
            ]
          },
        ]
      },
      {
        id: 2, titulo: 'Historia Argentina', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Pueblos originarios', completo: false, activo: false,
            contenido: 'Antes de la llegada de los españoles, el territorio argentino estaba habitado por numerosos pueblos originarios. Los mapuches en la Patagonia, los guaraníes en el noreste, los diaguitas en el noroeste, y los querandíes en la pampa.',
            formula: 'Mapuches → Patagonia | Guaraníes → NE | Diaguitas → NO',
            ejercicios: [
              { pregunta: '¿Qué pueblo originario habitaba la Patagonia?', opciones: ['Guaraníes', 'Diaguitas', 'Mapuches', 'Querandíes'], correcta: 2, exp: 'Los mapuches habitaban la región patagónica y parte de Chile.' },
            ]
          },
          { id: 2, titulo: 'La Revolución de Mayo', completo: false, bloqueado: true,
            contenido: 'El 25 de mayo de 1810 se formó la Primera Junta de Gobierno en Buenos Aires, dando inicio al proceso de independencia argentina. Fue consecuencia de la crisis de la monarquía española por la invasión napoleónica.',
            formula: '25 de mayo de 1810 → Primera Junta de Gobierno',
            ejercicios: [
              { pregunta: '¿En qué año ocurrió la Revolución de Mayo?', opciones: ['1806', '1810', '1816', '1820'], correcta: 1, exp: 'La Revolución de Mayo ocurrió el 25 de mayo de 1810.' },
              { pregunta: '¿Qué se formó el 25 de mayo de 1810?', opciones: ['El Congreso', 'La Primera Junta', 'El Virreinato', 'La Constitución'], correcta: 1, exp: 'Se formó la Primera Junta de Gobierno, dando inicio al proceso independentista.' },
            ]
          },
        ]
      },
    ]
  },
  geografia: {
    nombre: 'Geografía', emoji: '🌍', color: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600',
    unidades: [
      {
        id: 1, titulo: 'El planeta Tierra', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'Capas de la Tierra', completo: false, activo: true,
            contenido: 'La Tierra está formada por capas concéntricas. La corteza es la capa exterior donde vivimos. El manto es la capa intermedia con roca semilíquida. El núcleo externo es líquido y el núcleo interno es sólido y muy caliente.',
            formula: 'Corteza → Manto → Núcleo externo → Núcleo interno',
            ejercicios: [
              { pregunta: '¿En qué capa de la Tierra vivimos?', opciones: ['Manto', 'Núcleo', 'Corteza', 'Litosfera'], correcta: 2, exp: 'Vivimos en la corteza terrestre, la capa más externa y delgada.' },
              { pregunta: '¿Cómo es el núcleo interno de la Tierra?', opciones: ['Líquido y frío', 'Sólido y caliente', 'Gaseoso', 'Igual al manto'], correcta: 1, exp: 'El núcleo interno es sólido debido a la enorme presión y alcanza temperaturas de hasta 5.000°C.' },
            ]
          },
          { id: 2, titulo: 'Continentes y océanos', completo: false, bloqueado: true,
            contenido: 'La Tierra tiene 5 océanos: Pacífico (el más grande), Atlántico, Índico, Ártico y Antártico. Y 6 continentes: América, Europa, Asia, África, Oceanía y Antártida.',
            formula: '5 océanos | 6 continentes',
            ejercicios: [
              { pregunta: '¿Cuál es el océano más grande del mundo?', opciones: ['Atlántico', 'Índico', 'Pacífico', 'Ártico'], correcta: 2, exp: 'El Océano Pacífico es el más grande, cubriendo casi un tercio de la superficie terrestre.' },
              { pregunta: '¿Cuántos continentes tiene la Tierra?', opciones: ['5', '6', '7', '4'], correcta: 1, exp: 'La Tierra tiene 6 continentes: América, Europa, Asia, África, Oceanía y Antártida.' },
            ]
          },
        ]
      },
      {
        id: 2, titulo: 'Argentina: territorio y regiones', pct: 0, completa: false, bloqueado: true,
        temas: [
          { id: 1, titulo: 'Regiones de Argentina', completo: false, activo: false,
            contenido: 'Argentina se divide en regiones geográficas. El NOA (noroeste) con la Puna y valles andinos. El NEA (noreste) con selvas y esteros. Cuyo con montañas y viñedos. La Pampa con llanuras fértiles. La Patagonia con mesetas y frío. Y la región Metropolitana de Buenos Aires.',
            formula: 'NOA → Puna | NEA → Selva | Cuyo → Andes | Pampa → Llanura | Patagonia → Meseta',
            ejercicios: [
              { pregunta: '¿Qué región argentina se caracteriza por sus llanuras fértiles y producción agropecuaria?', opciones: ['NOA', 'Patagonia', 'Pampa', 'Cuyo'], correcta: 2, exp: 'La región pampeana se caracteriza por sus extensas llanuras y es el motor agropecuario del país.' },
            ]
          },
        ]
      },
    ]
  },
  ingles: {
    nombre: 'Inglés', emoji: '🗣️', color: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-600',
    unidades: [
      {
        id: 1, titulo: 'Grammar fundamentals', pct: 0, completa: false,
        temas: [
          { id: 1, titulo: 'Present Simple', completo: false, activo: true,
            contenido: 'El Present Simple se usa para hábitos, rutinas y verdades generales. Estructura: Sujeto + verbo (+ s en 3ra persona singular). Negativo: sujeto + do/does + not + verbo. Pregunta: Do/Does + sujeto + verbo?',
            formula: 'I work | He works | She does not work | Do you work?',
            ejercicios: [
              { pregunta: '"She ___ to school every day." Complete:', opciones: ['go', 'goes', 'going', 'went'], correcta: 1, exp: 'En 3ra persona singular (she/he/it) el verbo lleva -s: goes.' },,
      {
        id: 2, titulo: 'Álgebra básica', pct: 100, completa: true,
        temas: [
          { id: 1, titulo: 'Expresiones algebraicas', completo: true },
          { id: 2, titulo: 'Ecuaciones lineales', completo: true },
        ]
      },
      {
        id: 3, titulo: 'Ecuaciones cuadráticas', pct: 60, completa: false,
        temas: [
          { id: 1, titulo: '¿Qué es una ecuación cuadrática?', completo: true },
          { id: 2, titulo: 'Fórmula resolvente', completo: true },
          { id: 3, titulo: 'Factoreo de trinomios', completo: false, activo: true },
          { id: 4, titulo: 'Gráfica de parábola', completo: false, bloqueado: true },
          { id: 5, titulo: 'Problemas aplicados', completo: false, bloqueado: true },
        ]
      },
      {
        id: 4, titulo: 'Sistemas de ecuaciones', pct: 0, completa: false, bloqueado: true,
        temas: []
      },
      {
        id: 5, titulo: 'Funciones', pct: 0, completa: false, bloqueado: true,
        temas: []
      },
    ]
  },
  lengua: {
    nombre: 'Lengua y Literatura', emoji: '📖', color: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-600',
    unidades: [
      { id: 1, titulo: 'Comprensión lectora', pct: 100, completa: true, temas: [
        { id: 1, titulo: 'Tipos de texto', completo: true },
        { id: 2, titulo: 'Idea principal', completo: true },
      ]},
      { id: 2, titulo: 'Narrativa', pct: 70, completa: false, temas: [
        { id: 1, titulo: 'El cuento', completo: true },
        { id: 2, titulo: 'El narrador', completo: false, activo: true },
        { id: 3, titulo: 'Recursos literarios', completo: false, bloqueado: true },
      ]},
      { id: 3, titulo: 'Gramática', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  biologia: {
    nombre: 'Biología', emoji: '🔬', color: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-600',
    unidades: [
      { id: 1, titulo: 'La célula', pct: 21, completa: false, temas: [
        { id: 1, titulo: 'Célula procariota y eucariota', completo: true },
        { id: 2, titulo: 'Orgánulos celulares', completo: false, activo: true },
        { id: 3, titulo: 'División celular', completo: false, bloqueado: true },
      ]},
      { id: 2, titulo: 'Genética', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  historia: {
    nombre: 'Historia', emoji: '🗺️', color: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-600',
    unidades: [
      { id: 1, titulo: 'Primera Guerra Mundial', pct: 80, completa: false, temas: [
        { id: 1, titulo: 'Causas del conflicto', completo: true },
        { id: 2, titulo: 'Los bloques de alianzas', completo: true },
        { id: 3, titulo: 'El armisticio', completo: false, activo: true },
      ]},
      { id: 2, titulo: 'Entreguerras', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  geografia: {
    nombre: 'Geografía', emoji: '🌍', color: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600',
    unidades: [
      { id: 1, titulo: 'América del Sur', pct: 15, completa: false, temas: [
        { id: 1, titulo: 'Relieve y climas', completo: true },
        { id: 2, titulo: 'Recursos naturales', completo: false, activo: true },
      ]},
    ]
  },
  ingles: {
    nombre: 'Inglés', emoji: '🗣️', color: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-600',
    unidades: [
      { id: 1, titulo: 'Grammar', pct: 40, completa: false, temas: [
        { id: 1, titulo: 'Present tenses', completo: true },
        { id: 2, titulo: 'Conditionals', completo: false, activo: true },
        { id: 3, titulo: 'Passive voice', completo: false, bloqueado: true },
      ]},
    ]
  },
};

const EJERCICIOS = {
  'matematica-3-3': [
    { pregunta: 'Factoreá: x² + 7x + 12', opciones: ['(x+3)(x+5)', '(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)'], correcta: 1, exp: 'Buscamos dos números que multiplicados den 12 y sumados den 7. Son 3 y 4.' },
    { pregunta: 'Raíces de x² − 5x + 6 = 0', opciones: ['x=2 y x=3', 'x=−2 y x=−3', 'x=1 y x=6', 'x=−1 y x=−6'], correcta: 0, exp: 'Factoreamos: (x−2)(x−3)=0. Las raíces son x=2 y x=3.' },
    { pregunta: 'Factoreá: x² + 9x + 20', opciones: ['(x+4)(x+5)', '(x+2)(x+10)', '(x+3)(x+7)', '(x+1)(x+20)'], correcta: 0, exp: 'Buscamos números que multiplicados den 20 y sumados den 9. Son 4 y 5.' },
  ]
};

export default function Materias() {
  const [materiaActiva, setMateriaActiva] = useState('matematica');
  const [unidadAbierta, setUnidadAbierta] = useState(3);
  const [temaActivo, setTemaActivo] = useState({unidad: 3, tema: 3});
  const [ejIdx, setEjIdx] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [vista, setVista] = useState('contenido');

  const materia = CONTENIDO[materiaActiva];
  const ejKey = `${materiaActiva}-${temaActivo.unidad}-${temaActivo.tema}`;
  const ejercicios = EJERCICIOS[ejKey] || [];
  const ej = ejercicios[ejIdx];

  const cambiarMateria = (id) => {
    setMateriaActiva(id);
    setUnidadAbierta(1);
    setTemaActivo({unidad:1, tema:1});
    setEjIdx(0);
    setRespuesta(null);
    setVista('contenido');
  };

  const responder = (idx) => {
    if (respuesta !== null) return;
    setRespuesta(idx);
  };

  const sigEj = () => {
    setEjIdx((ejIdx + 1) % ejercicios.length);
    setRespuesta(null);
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Lista de materias */}
      <div className="w-44 flex-shrink-0 flex flex-col gap-1.5">
        {Object.entries(CONTENIDO).map(([id, m]) => (
          <button key={id} onClick={() => cambiarMateria(id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${materiaActiva === id ? `${m.color} ${m.text}` : 'bg-white border border-gray-100 text-gray-500 hover:border-gray-200'}`}>
            <span className="text-base">{m.emoji}</span>
            <span className="leading-tight">{m.nombre}</span>
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 gap-3">
        {/* Header materia */}
        <div className={`${materia.color} rounded-xl p-4 flex items-center justify-between`}>
          <div>
            <div className={`font-semibold text-base ${materia.text}`}>{materia.nombre}</div>
            <div className={`text-xs ${materia.text} opacity-70 mt-0.5`}>{materia.unidades.length} unidades</div>
          </div>
          <div className="text-3xl">{materia.emoji}</div>
        </div>

        {/* Unidades */}
        <div className="flex flex-col gap-2">
          {materia.unidades.map(u => (
            <div key={u.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => !u.bloqueado && setUnidadAbierta(unidadAbierta === u.id ? null : u.id)}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${u.completa ? 'bg-emerald-100 text-emerald-700' : u.bloqueado ? 'bg-gray-100 text-gray-400' : `${materia.color} ${materia.text}`}`}>
                  {u.completa ? '✓' : u.bloqueado ? '🔒' : u.id}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${u.bloqueado ? 'text-gray-400' : 'text-gray-800'}`}>{u.titulo}</div>
                  <div className="h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden w-32">
                    <div className={`h-full ${materia.bar} rounded-full`} style={{width: u.pct+'%'}}></div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${u.bloqueado ? 'text-gray-300' : materia.text}`}>{u.pct}%</div>
                {!u.bloqueado && <span className="text-gray-300 text-xs">{unidadAbierta === u.id ? '▲' : '▼'}</span>}
              </div>

              {unidadAbierta === u.id && u.temas.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                  {u.temas.map(t => (
                    <div key={t.id}
                      onClick={() => !t.bloqueado && (setTemaActivo({unidad: u.id, tema: t.id}), setVista('contenido'), setRespuesta(null), setEjIdx(0))}
                      className={`flex items-center gap-2 py-2 px-2 rounded-lg text-xs cursor-pointer transition-colors mb-0.5
                        ${temaActivo.unidad === u.id && temaActivo.tema === t.id ? `${materia.color} ${materia.text} font-medium` : t.bloqueado ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white'}`}>
                      <span>{t.completo ? '✅' : t.bloqueado ? '🔒' : t.activo ? '▶️' : '⭕'}</span>
                      {t.titulo}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho: contenido + ejercicios */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setVista('contenido')}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${vista === 'contenido' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
            📖 Contenido
          </button>
          <button onClick={() => setVista('ejercicios')}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${vista === 'ejercicios' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
            ✏️ Ejercicios
          </button>
        </div>

        {vista === 'contenido' && (() => {
  const u = materia.unidades.find(u => u.id === temaActivo.unidad);
  const t = u?.temas.find(t => t.id === temaActivo.tema);
  if (!t) return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 text-center text-gray-400 text-xs">
      <div className="text-3xl mb-2">📖</div>
      Seleccioná un tema para ver el contenido
    </div>
  );
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 overflow-y-auto">
      <div className={`font-medium text-sm mb-3 ${materia.text}`}>{t.titulo}</div>
      <div className="text-xs text-gray-600 leading-relaxed mb-3">{t.contenido}</div>
      {t.formula && (
        <div className={`${materia.color} border-l-2 rounded-r-lg p-3 font-mono text-xs mb-3 whitespace-pre-line ${materia.text}`} style={{borderColor:'currentColor'}}>
          {t.formula}
        </div>
      )}
      <button onClick={() => setVista('ejercicios')}
        className={`w-full py-2 rounded-lg text-xs font-medium text-white transition-colors ${materia.bar} hover:opacity-90 mt-2`}>
        Practicar ejercicios →
      </button>
    </div>
  );
})()}

        {vista === 'ejercicios' && ej && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-gray-800 text-sm">Ejercicio</div>
              <div className="text-xs text-gray-400">{ejIdx+1}/{ejercicios.length}</div>
            </div>
            <div className="text-sm text-gray-800 mb-4 leading-relaxed">{ej.pregunta}</div>
            <div className="flex flex-col gap-2 mb-3">
              {ej.opciones.map((op, i) => (
                <button key={i} onClick={() => responder(i)}
                  className={`text-left px-3 py-2 rounded-lg text-xs border transition-colors
                    ${respuesta === null ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' :
                      i === ej.correcta ? 'border-emerald-400 bg-emerald-50 text-emerald-700 font-medium' :
                      respuesta === i ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'}`}>
                  {op}
                </button>
              ))}
            </div>
            {respuesta !== null && (
              <div className={`text-xs p-2.5 rounded-lg mb-3 ${respuesta === ej.correcta ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                {respuesta === ej.correcta ? '✓ Correcto. ' : '✗ Incorrecto. '}{ej.exp}
              </div>
            )}
            {respuesta !== null && (
              <button onClick={sigEj} className="w-full bg-purple-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors">
                Siguiente ejercicio →
              </button>
            )}
          </div>
        )}

        {vista === 'ejercicios' && !ej && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center text-gray-400 text-xs flex-1">
            <div className="text-3xl mb-2">✏️</div>
            Seleccioná un tema activo para ver sus ejercicios
          </div>
        )}
      </div>
    </div>
  );
}
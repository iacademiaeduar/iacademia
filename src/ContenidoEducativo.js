// iAcademia — Contenido Educativo por Año y Materia
// Currículum adaptado al sistema educativo argentino — Secundaria 1° a 6°

export const CONTENIDO_EDUCATIVO = {

  matematica: {
    nombre: 'Matemática', emoji: '🧮',
    color: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-600',
    tutor: { nombre: 'Profe Marcos', emoji: '🧮', saludo: '¡Hola! Soy Marcos. Acá no memorizamos fórmulas — entendemos por qué funcionan. ¿Arrancamos?' },
    años: {
      1: {
        titulo: 'Fundamentos matemáticos',
        descripcion: 'Base sólida en números, operaciones y geometría.',
        unidades: [
          { id:1, titulo:'Números naturales y sistema decimal', pct:0,
            temas: [
              { id:1, titulo:'Números hasta 10.000', activo:true,
  contenido:'Los números naturales son los que usamos para contar. En el sistema decimal, cada posición vale 10 veces más que la anterior. El número 3.456 tiene: 3 unidades de mil, 4 centenas, 5 decenas y 6 unidades. Entender el valor posicional es la base de toda la matemática.',
  formula:'3.456 = 3.000 + 400 + 50 + 6\nU.M | C | D | U\n  3 | 4 | 5 | 6',
  ejercicios:[
    {pregunta:'¿Cuántas centenas tiene 2.738?', opciones:['2','7','3','8'], correcta:1, exp:'El dígito 7 ocupa la posición de las centenas: 700.'},
    {pregunta:'¿Cuál es el mayor número de 4 cifras?', opciones:['1000','9999','9990','9909'], correcta:1, exp:'9.999 es el mayor número de 4 cifras posible.'},
    {pregunta:'En 5.204, ¿cuántas unidades de mil hay?', opciones:['2','0','5','4'], correcta:2, exp:'El 5 está en la posición de las unidades de mil = 5.000.'},
    {pregunta:'¿Cómo se escribe "cuatro mil trescientos dos"?', opciones:['4.032','4.302','4.320','4.003'], correcta:1, exp:'Cuatro mil=4000, trescientos=300, dos=2. Total: 4.302.'},
    {pregunta:'¿Qué número tiene 6 centenas, 0 decenas y 5 unidades?', opciones:['605','650','560','506'], correcta:0, exp:'6 centenas=600, 0 decenas=0, 5 unidades=5. Total: 605.'},
    {pregunta:'¿Cuál es el valor del 4 en 3.427?', opciones:['4','40','400','4000'], correcta:2, exp:'El 4 está en la posición de las centenas: 400.'},
    {pregunta:'Ordenar de menor a mayor: 1.203, 1.023, 1.302', opciones:['1.023, 1.203, 1.302','1.302, 1.203, 1.023','1.203, 1.023, 1.302','1.023, 1.302, 1.203'], correcta:0, exp:'Comparamos centenas: 0<2<3, entonces 1.023<1.203<1.302.'},
  ]
},
              { id:2, titulo:'Suma y resta con llevada', bloqueado:true,
                contenido:'Cuando sumamos y el resultado supera 9, llevamos 1 a la columna siguiente. En la resta, cuando el dígito de arriba es menor, pedimos prestado.',
                formula:'  456\n+ 378\n-----\n  834',
                ejercicios:[
                  {pregunta:'456 + 378 = ?', opciones:['724','834','824','734'], correcta:1, exp:'6+8=14(4,1), 5+7+1=13(3,1), 4+3+1=8. Resultado: 834.'},
                  {pregunta:'502 − 347 = ?', opciones:['155','165','255','145'], correcta:0, exp:'502 − 347 = 155.'},
                ]
              },
              { id:3, titulo:'Multiplicación y división', bloqueado:true,
                contenido:'La multiplicación es una suma repetida. La división reparte en partes iguales. Verificación: Divisor × Cociente + Resto = Dividendo.',
                formula:'4 × 3 = 12\n23 ÷ 4 = 5 (resto 3)\nVerificación: 4×5+3=23 ✓',
                ejercicios:[
                  {pregunta:'7 × 8 = ?', opciones:['54','56','63','48'], correcta:1, exp:'7 × 8 = 56.'},
                  {pregunta:'25 ÷ 4: ¿cuál es el resto?', opciones:['0','1','2','3'], correcta:1, exp:'4×6=24, resto=25−24=1.'},
                ]
              },
              { id:4, titulo:'Fracciones y decimales', bloqueado:true,
                contenido:'Una fracción representa una parte de un entero. Los decimales son otra forma de escribir fracciones. La coma separa la parte entera de la decimal.',
                formula:'3/4 → 3 partes de 4\n0,5 = 1/2\n0,25 = 1/4\n1/2 + 1/4 = 3/4',
                ejercicios:[
                  {pregunta:'¿Qué fracción representa la mitad?', opciones:['1/4','1/3','1/2','2/3'], correcta:2, exp:'La mitad es 1/2.'},
                  {pregunta:'¿Cuánto es 0,5 + 0,3?', opciones:['0,8','0,53','8','0,08'], correcta:0, exp:'0,5 + 0,3 = 0,8.'},
                ]
              },
            ]
          },
          { id:2, titulo:'Geometría básica', pct:0, bloqueado:true,
            temas: [
              { id:1, titulo:'Figuras planas', bloqueado:true,
                contenido:'Las figuras planas tienen dos dimensiones. Triángulo: 3 lados, suma ángulos=180°. Cuadrado: 4 lados iguales, 4 ángulos de 90°. Círculo: diámetro = 2 × radio.',
                formula:'Triángulo: suma ángulos = 180°\nCuadrado: 4 lados iguales\nCírculo: d = 2r',
                ejercicios:[
                  {pregunta:'¿Cuántos lados tiene un hexágono?', opciones:['5','6','7','8'], correcta:1, exp:'Hexa = 6 en griego.'},
                  {pregunta:'Un triángulo tiene ángulos de 60° y 80°. ¿El tercero?', opciones:['30°','40°','50°','60°'], correcta:1, exp:'180°−60°−80°=40°.'},
                ]
              },
              { id:2, titulo:'Perímetro y área', bloqueado:true,
                contenido:'El perímetro es la suma de todos los lados. El área es la superficie.',
                formula:'Rectángulo: P=2(b+h), A=b×h\nCuadrado: P=4l, A=l²\nTriángulo: A=(b×h)/2',
                ejercicios:[
                  {pregunta:'Rectángulo: base 8 cm, altura 3 cm. ¿Área?', opciones:['11 cm²','22 cm²','24 cm²','16 cm²'], correcta:2, exp:'A=8×3=24 cm².'},
                ]
              },
            ]
          },
          { id:3, titulo:'Álgebra introductoria', pct:0, bloqueado:true,
            temas: [
              { id:1, titulo:'Ecuaciones de primer grado', bloqueado:true,
                contenido:'Una ecuación es una igualdad con una incógnita que debemos encontrar. Hacemos la operación inversa en ambos lados para despejar.',
                formula:'x + 5 = 12\nx = 12 − 5 = 7\nVerificación: 7+5=12 ✓',
                ejercicios:[
                  {pregunta:'x + 8 = 15. ¿Cuánto vale x?', opciones:['5','6','7','8'], correcta:2, exp:'x=15−8=7.'},
                  {pregunta:'2x = 14. ¿Cuánto vale x?', opciones:['5','6','7','8'], correcta:2, exp:'x=14÷2=7.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Álgebra y funciones',
        descripcion: 'Ecuaciones, funciones lineales y proporcionalidad.',
        unidades: [
          { id:1, titulo:'Ecuaciones y sistemas', pct:0,
            temas:[
              { id:1, titulo:'Sistemas de ecuaciones', activo:true,
                contenido:'Un sistema tiene dos ecuaciones con dos incógnitas. Método de suma: sumamos las ecuaciones para eliminar una variable.',
                formula:'x + y = 10\nx − y = 4\n→ Sumando: 2x=14 → x=7\n→ y=10−7=3',
                ejercicios:[
                  {pregunta:'Si x+y=8 y x−y=2, ¿cuánto vale x?', opciones:['3','4','5','6'], correcta:2, exp:'Sumando: 2x=10 → x=5.'},
                ]
              },
              { id:2, titulo:'Funciones lineales', bloqueado:true,
                contenido:'La función lineal tiene la forma y=mx+b. m es la pendiente, b la ordenada al origen. Si m>0 es creciente, si m<0 es decreciente.',
                formula:'y = mx + b\ny = 2x+1\nx=0→y=1, x=1→y=3, x=2→y=5',
                ejercicios:[
                  {pregunta:'En y=3x+2, si x=4, ¿cuánto vale y?', opciones:['10','12','14','16'], correcta:2, exp:'y=3(4)+2=14.'},
                ]
              },
              { id:3, titulo:'Porcentajes', bloqueado:true,
                contenido:'El porcentaje expresa una parte de 100. Muy usado en descuentos, intereses y estadísticas.',
                formula:'20% de 350 = 350×20/100 = 70\nAumento 15%: precio×1,15\nDescuento 30%: precio×0,70',
                ejercicios:[
                  {pregunta:'¿Cuánto es el 25% de 200?', opciones:['25','40','50','75'], correcta:2, exp:'200×25/100=50.'},
                  {pregunta:'Producto $1000 con 20% descuento. ¿Precio final?', opciones:['$800','$900','$750','$850'], correcta:0, exp:'$1000×0,80=$800.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Ecuaciones cuadráticas y trigonometría',
        descripcion: 'Ecuaciones de segundo grado, factoreo y trigonometría básica.',
        unidades: [
          { id:1, titulo:'Ecuaciones cuadráticas', pct:0,
            temas:[
              { id:1, titulo:'Fórmula resolvente', activo:true,
                contenido:'La ecuación cuadrática ax²+bx+c=0 puede tener 0, 1 o 2 soluciones. El discriminante Δ=b²−4ac determina cuántas hay.',
                formula:'x = (−b ± √(b²−4ac)) / 2a\n\nΔ>0 → 2 soluciones\nΔ=0 → 1 solución\nΔ<0 → sin solución real\n\nEj: x²−5x+6=0 → x=3, x=2',
                ejercicios:[
                  {pregunta:'Discriminante de x²−5x+6=0:', opciones:['1','4','−1','0'], correcta:0, exp:'Δ=(−5)²−4(1)(6)=25−24=1.'},
                  {pregunta:'Soluciones de x²−5x+6=0:', opciones:['x=2 y x=3','x=−2 y x=−3','x=1 y x=6','x=−6 y x=−1'], correcta:0, exp:'x₁=3, x₂=2.'},
                  {pregunta:'¿Cuántas soluciones tiene x²+4=0?', opciones:['0','1','2','Infinitas'], correcta:0, exp:'Δ=0²−4(1)(4)=−16<0. Sin soluciones reales.'},
                  {pregunta:'En 2x²−3x+1=0, ¿cuánto vale a?', opciones:['1','2','−3','3'], correcta:1, exp:'En ax²+bx+c=0, el coeficiente de x² es a=2.'},
                  {pregunta:'Discriminante de x²−4x+4=0:', opciones:['0','4','8','−4'], correcta:0, exp:'Δ=(−4)²−4(1)(4)=16−16=0. Una solución doble.'},
                  {pregunta:'x²−4x+4=0 tiene como solución:', opciones:['x=2','x=−2','x=4','x=0'], correcta:0, exp:'Δ=0, x=(4±0)/2=2. Solución doble: x=2.'},
                  {pregunta:'¿Cuál ecuación tiene 2 soluciones reales?', opciones:['x²+1=0','x²−1=0','x²+x+1=0','ninguna'], correcta:1, exp:'x²−1=0: Δ=0−4(1)(−1)=4>0. Dos soluciones: x=1 y x=−1.'},
                ]
              },
              { id:2, titulo:'Trigonometría: razones trigonométricas', bloqueado:true,
                contenido:'En un triángulo rectángulo, las razones trig. relacionan ángulos con lados. SOH-CAH-TOA.',
                formula:'SOH: sen(α) = Opuesto/Hipotenusa\nCAH: cos(α) = Adyacente/Hipotenusa\nTOA: tan(α) = Opuesto/Adyacente',
                ejercicios:[
                  {pregunta:'Hipotenusa=10, cateto opuesto=6. ¿sen(α)?', opciones:['0,4','0,6','0,8','0,5'], correcta:1, exp:'sen(α)=6/10=0,6.'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Funciones avanzadas y estadística',
        descripcion: 'Funciones exponenciales, logaritmos y estadística descriptiva.',
        unidades: [
          { id:1, titulo:'Función exponencial y logaritmos', pct:0,
            temas:[
              { id:1, titulo:'Función exponencial', activo:true,
                contenido:'f(x)=aˣ crece muy rápido cuando a>1. Modela crecimiento bacteriano, interés compuesto y desintegración radiactiva.',
                formula:'f(x)=2ˣ\nx=0→1, x=1→2, x=2→4, x=3→8\n\nInterés compuesto: M=C×(1+r)ᵗ',
                ejercicios:[
                  {pregunta:'¿Cuánto vale 3⁴?', opciones:['12','64','81','27'], correcta:2, exp:'3⁴=3×3×3×3=81.'},
                ]
              },
              { id:2, titulo:'Logaritmos', bloqueado:true,
                contenido:'El logaritmo es la operación inversa a la potencia. logₐ(x)=y significa aʸ=x.',
                formula:'log₁₀(1000)=3 porque 10³=1000\nlog₂(8)=3 porque 2³=8\nlog₁₀(1)=0 porque 10⁰=1',
                ejercicios:[
                  {pregunta:'log₁₀(100) = ?', opciones:['1','2','10','100'], correcta:1, exp:'10²=100, entonces log₁₀(100)=2.'},
                ]
              },
              { id:3, titulo:'Estadística: medidas de tendencia', bloqueado:true,
                contenido:'Media: suma de datos dividido cantidad. Mediana: valor central. Moda: el más frecuente.',
                formula:'Media: x̄ = Σx/n\n{2,3,3,5,7} → Media=4, Mediana=3, Moda=3',
                ejercicios:[
                  {pregunta:'Media de {4,8,12,16}:', opciones:['8','10','12','9'], correcta:1, exp:'(4+8+12+16)/4=40/4=10.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Cálculo introductorio',
        descripcion: 'Límites, derivadas e introducción a la integral.',
        unidades: [
          { id:1, titulo:'Límites y derivadas', pct:0,
            temas:[
              { id:1, titulo:'Límites: concepto', activo:true,
                contenido:'El límite describe el comportamiento de una función cuando x se acerca a un valor. Es la base del cálculo diferencial e integral.',
                formula:'lím(x→3) de 2x+1 = 7\n(reemplazamos x=3)',
                ejercicios:[
                  {pregunta:'lím(x→3) de 2x+1 = ?', opciones:['6','7','8','5'], correcta:1, exp:'2(3)+1=7.'},
                ]
              },
              { id:2, titulo:'Derivadas: concepto y reglas', bloqueado:true,
                contenido:'La derivada mide la tasa de cambio instantánea. Geométricamente, es la pendiente de la tangente.',
                formula:'d/dx(xⁿ) = n·xⁿ⁻¹\nd/dx(x²) = 2x\nd/dx(x³) = 3x²\nd/dx(constante) = 0',
                ejercicios:[
                  {pregunta:'Si f(x)=x², ¿cuánto vale f\'(x)?', opciones:['x','2x','2x²','x/2'], correcta:1, exp:'d/dx(x²)=2x.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Cálculo integral y matemática financiera',
        descripcion: 'Integral definida, áreas y matemática aplicada a finanzas.',
        unidades: [
          { id:1, titulo:'Integral y finanzas', pct:0,
            temas:[
              { id:1, titulo:'Integral: concepto', activo:true,
                contenido:'La integral es la operación inversa a la derivada. Representa el área bajo una curva.',
                formula:'∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n∫2x dx = x² + C\n∫₀² 2x dx = [x²]₀² = 4',
                ejercicios:[
                  {pregunta:'∫3x² dx = ?', opciones:['x³','x³+C','3x³+C','6x'], correcta:1, exp:'∫3x² dx = x³+C.'},
                ]
              },
              { id:2, titulo:'Interés compuesto', bloqueado:true,
                contenido:'El interés compuesto genera intereses sobre intereses. Crece exponencialmente.',
                formula:'Simple: I = C×r×t\nCompuesto: M = C×(1+r)ᵗ\n\n$10.000 al 10% anual, 3 años:\nCompuesto: M=10000×(1,1)³=$13.310',
                ejercicios:[
                  {pregunta:'$5000 al 8% simple, 2 años. ¿Interés?', opciones:['$400','$800','$1000','$600'], correcta:1, exp:'I=5000×0,08×2=$800.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },

  lengua: {
    nombre: 'Lengua y Literatura', emoji: '📖',
    color: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-600',
    tutor: { nombre: 'Profe Ana', emoji: '📖', saludo: '¡Hola! Soy Ana. Las palabras son la herramienta más poderosa que tenés. Aprendamos a usarlas bien.' },
    años: {
      1: {
        titulo: 'Comprensión y producción textual',
        descripcion: 'Tipos de textos, narración y gramática fundamental.',
        unidades: [
          { id:1, titulo:'Tipos de textos', pct:0,
            temas:[
              { id:1, titulo:'Textos narrativos', activo:true,
                contenido:'Los textos narrativos cuentan hechos reales o imaginarios. Tienen personajes, narrador, trama y desenlace. El cuento, la novela y la crónica son ejemplos.',
                formula:'Estructura:\n1. Situación inicial\n2. Conflicto/nudo\n3. Desenlace',
                ejercicios:[
                  {pregunta:'¿Qué tipo de texto es un cuento?', opciones:['Descriptivo','Narrativo','Argumentativo','Informativo'], correcta:1, exp:'El cuento narra hechos con personajes y trama.'},
                  {pregunta:'¿Cuál es la parte donde surge el problema?', opciones:['Inicio','Nudo','Desenlace','Epílogo'], correcta:1, exp:'El nudo es donde aparece el conflicto.'},
                ]
              },
              { id:2, titulo:'Textos descriptivos e informativos', bloqueado:true,
                contenido:'Descriptivos: presentan características. Informativos: explican datos con objetividad. Las noticias y enciclopedias son textos informativos.',
                formula:'Descriptivo: cómo ES algo (adjetivos)\nInformativo: qué SUCEDE (datos, fechas)',
                ejercicios:[
                  {pregunta:'¿Qué tipo de texto es una noticia?', opciones:['Narrativo','Descriptivo','Informativo','Argumentativo'], correcta:2, exp:'La noticia informa hechos reales con objetividad.'},
                ]
              },
              { id:3, titulo:'Textos argumentativos', bloqueado:true,
                contenido:'Buscan convencer al lector. Tienen tesis, argumentos y conclusión.',
                formula:'1. Tesis: postura\n2. Argumentos: razones\n3. Conclusión: refuerzo',
                ejercicios:[
                  {pregunta:'¿Cuál es el propósito de un texto argumentativo?', opciones:['Entretener','Informar','Convencer','Describir'], correcta:2, exp:'Busca convencer al lector de una postura.'},
                ]
              },
            ]
          },
          { id:2, titulo:'Gramática', pct:0, bloqueado:true,
            temas:[
              { id:1, titulo:'Sustantivos y adjetivos', bloqueado:true,
                contenido:'Los sustantivos nombran personas, cosas, lugares. Los adjetivos califican al sustantivo y concuerdan en género y número.',
                formula:'"la casa grande" (fem. sing.)\n"los autos rojos" (masc. plur.)',
                ejercicios:[
                  {pregunta:'¿Cuál es el sustantivo en "el árbol verde"?', opciones:['el','árbol','verde','ninguno'], correcta:1, exp:'Árbol nombra una cosa.'},
                  {pregunta:'¿Cuál es el adjetivo en "la noche oscura"?', opciones:['la','noche','oscura','ninguno'], correcta:2, exp:'Oscura califica al sustantivo noche.'},
                ]
              },
              { id:2, titulo:'Verbos y tiempos verbales', bloqueado:true,
                contenido:'El verbo expresa acciones. Los tiempos: pasado, presente, futuro.',
                formula:'CORRER:\nPasado: corrí/corría\nPresente: corro\nFuturo: correré',
                ejercicios:[
                  {pregunta:'"Mañana estudiaré" está en tiempo:', opciones:['Pasado','Presente','Futuro','No tiene'], correcta:2, exp:'"Estudiaré" indica acción futura.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Literatura y análisis',
        descripcion: 'Literatura latinoamericana y recursos literarios.',
        unidades:[
          { id:1, titulo:'Literatura latinoamericana', pct:0,
            temas:[
              { id:1, titulo:'El realismo mágico', activo:true,
                contenido:'Corriente literaria que mezcla lo cotidiano con elementos mágicos. Exponentes: García Márquez y Borges.',
                formula:'Características:\n→ Mezcla realidad y magia\n→ Personajes aceptan lo sobrenatural\n→ Crítica social implícita\nEj: "Cien años de soledad"',
                ejercicios:[
                  {pregunta:'¿Qué caracteriza al realismo mágico?', opciones:['Solo describe la realidad','Mezcla realidad y elementos mágicos','Es solo fantástico','No tiene personajes'], correcta:1, exp:'Integra lo mágico en la realidad sin explicarlo.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Retórica y recursos literarios',
        descripcion: 'Figuras retóricas, oratoria y argumentación.',
        unidades:[
          { id:1, titulo:'Recursos literarios', pct:0,
            temas:[
              { id:1, titulo:'Figuras retóricas', activo:true,
                contenido:'Las figuras retóricas embellecen el lenguaje. Metáfora, símil, hipérbole, personificación y anáfora son las más importantes.',
                formula:'Metáfora: "Sus ojos son estrellas"\nSímil: "ojos como estrellas"\nHipérbole: "te lo dije un millón de veces"\nPersonificación: "el viento susurra"\nAnáfora: "vendrá, vendrá, vendrá..."',
                ejercicios:[
                  {pregunta:'"El tiempo es oro" es:', opciones:['Símil','Metáfora','Hipérbole','Anáfora'], correcta:1, exp:'Metáfora: comparación directa sin "como".'},
                  {pregunta:'"Lloré un océano de lágrimas" es:', opciones:['Metáfora','Anáfora','Hipérbole','Personificación'], correcta:2, exp:'Hipérbole: exageración para dar énfasis.'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Literatura universal',
        descripcion: 'Grandes obras de la literatura mundial.',
        unidades:[
          { id:1, titulo:'Tragedia griega y Shakespeare', pct:0,
            temas:[
              { id:1, titulo:'Tragedia griega', activo:true,
                contenido:'La tragedia griega explora el destino, la hybris y la catarsis. Shakespeare retomó estos temas: Hamlet, Macbeth, Romeo y Julieta.',
                formula:'Tragedia:\n→ Héroe con falla (hybris)\n→ Destino inevitable\n→ Catarsis: purificación emocional\n→ Coro: voz del pueblo',
                ejercicios:[
                  {pregunta:'¿Qué es la catarsis en la tragedia?', opciones:['La muerte del héroe','Purificación emocional del espectador','El conflicto','El desenlace'], correcta:1, exp:'Catarsis: purificación de miedo y compasión en el espectador.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Comunicación y medios',
        descripcion: 'Análisis crítico de medios y comunicación digital.',
        unidades:[
          { id:1, titulo:'Análisis crítico de medios', pct:0,
            temas:[
              { id:1, titulo:'¿Cómo leer un medio?', activo:true,
                contenido:'Los medios construyen relatos sobre la realidad. Hay que identificar: quién emite, qué dice, qué omite y qué intereses hay.',
                formula:'Analizar un medio:\n1. ¿Quién lo produce?\n2. ¿Para quién?\n3. ¿Qué incluye y omite?\n4. ¿Qué recursos persuasivos usa?\n5. ¿Qué imagen construye?',
                ejercicios:[
                  {pregunta:'¿Cuál es el objetivo del análisis crítico de medios?', opciones:['Criticar periodistas','Identificar intereses y construcción del relato','Buscar errores gramaticales','Aprender a escribir noticias'], correcta:1, exp:'Identificar quién habla, desde dónde y con qué intereses.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Literatura argentina y escritura profesional',
        descripcion: 'Narrativa argentina del siglo XX y escritura académica avanzada.',
        unidades:[
          { id:1, titulo:'Literatura argentina', pct:0,
            temas:[
              { id:1, titulo:'Borges, Cortázar, Walsh', activo:true,
                contenido:'La literatura argentina del siglo XX es de las más ricas del mundo. Borges: cuento fantástico. Cortázar: ruptura y juego. Walsh: periodismo y denuncia política.',
                formula:'Borges → cuento fantástico e intelectual\nCortázar → realismo mágico, ruptura\nPuig → lenguaje popular, cine\nWalsh → periodismo y denuncia\nSaer → la memoria y el litoral',
                ejercicios:[
                  {pregunta:'¿Qué autor argentino es conocido por sus "Ficciones"?', opciones:['Cortázar','Walsh','Borges','Puig'], correcta:2, exp:'Jorge Luis Borges es el máximo exponente del cuento fantástico argentino.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },

  biologia: {
    nombre: 'Biología', emoji: '🔬',
    color: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-600',
    tutor: { nombre: 'Profe Laura', emoji: '🔬', saludo: '¡Hola! Soy Laura. La biología es la ciencia de la vida — incluyendo la tuya.' },
    años: {
      1: {
        titulo: 'La célula y los seres vivos',
        descripcion: 'Biología celular, clasificación y ecosistemas.',
        unidades:[
          { id:1, titulo:'La célula', pct:0,
            temas:[
              { id:1, titulo:'Célula procariota y eucariota', activo:true,
                contenido:'La célula es la unidad de vida. Procariotas (bacterias): sin núcleo definido. Eucariotas: con núcleo y orgánulos especializados.',
                formula:'Procariota: sin núcleo, ADN libre, 1-10 μm\nEucariota: núcleo con membrana, orgánulos, 10-100 μm',
                ejercicios:[
                  {pregunta:'¿Qué célula NO tiene núcleo definido?', opciones:['Eucariota animal','Eucariota vegetal','Procariota','Todas tienen'], correcta:2, exp:'Las procariotas no tienen núcleo definido.'},
                  {pregunta:'¿Cuál es organismo procariota?', opciones:['Hongo','Planta','Bacteria','Animal'], correcta:2, exp:'Las bacterias son los únicos organismos procariotas.'},
                ]
              },
              { id:2, titulo:'Orgánulos y funciones', bloqueado:true,
                contenido:'Cada orgánulo cumple una función específica como un órgano en el cuerpo.',
                formula:'Núcleo → controla la célula\nMitocondria → produce energía (ATP)\nRibosoma → fabrica proteínas\nCloroplasto → fotosíntesis (solo vegetal)',
                ejercicios:[
                  {pregunta:'¿Qué orgánulo produce energía?', opciones:['Núcleo','Ribosoma','Mitocondria','Vacuola'], correcta:2, exp:'La mitocondria produce ATP por respiración celular.'},
                  {pregunta:'¿Qué orgánulo es exclusivo de plantas?', opciones:['Mitocondria','Ribosoma','Núcleo','Cloroplasto'], correcta:3, exp:'El cloroplasto realiza la fotosíntesis.'},
                ]
              },
              { id:3, titulo:'Mitosis y meiosis', bloqueado:true,
                contenido:'Mitosis: 1 célula → 2 idénticas (crecimiento). Meiosis: 1 célula → 4 con mitad del genoma (gametos).',
                formula:'Mitosis: 2n → 2n (crecimiento)\nMeiosis: 2n → n (gametos)\nGametos: espermatozoide, óvulo',
                ejercicios:[
                  {pregunta:'¿Qué división produce células para el crecimiento?', opciones:['Meiosis','Mitosis','Fisión binaria','Gemación'], correcta:1, exp:'La mitosis produce células idénticas.'},
                  {pregunta:'¿Cuántas células produce la meiosis?', opciones:['1','2','4','8'], correcta:2, exp:'La meiosis produce 4 células haploides.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Genética y evolución',
        descripcion: 'Herencia mendeliana, ADN y evolución.',
        unidades:[
          { id:1, titulo:'Genética mendeliana', pct:0,
            temas:[
              { id:1, titulo:'Las leyes de Mendel', activo:true,
                contenido:'Mendel descubrió las leyes de la herencia. Dominante (A) se expresa; recesivo (a) se oculta cuando está con A.',
                formula:'Aa × Aa:\n→ AA, Aa, Aa, aa (1:2:1)\nFenotipos: 3 dominantes : 1 recesivo',
                ejercicios:[
                  {pregunta:'Al cruzar AA × aa, ¿genotipo F1?', opciones:['AA','aa','Aa','50% AA y 50% aa'], correcta:2, exp:'Todos son Aa. Primera ley de Mendel.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Fisiología humana',
        descripcion: 'Sistemas del cuerpo: digestivo, circulatorio y nervioso.',
        unidades:[
          { id:1, titulo:'Sistemas del cuerpo', pct:0,
            temas:[
              { id:1, titulo:'Sistema digestivo', activo:true,
                contenido:'La digestión transforma alimentos en nutrientes absorbibles. Boca → Esófago → Estómago → Intestino delgado → Intestino grueso.',
                formula:'Ptialina (boca): almidón\nPepsina (estómago): proteínas\nLipasa (intestino): grasas\n\nAbsorción: intestino delgado',
                ejercicios:[
                  {pregunta:'¿Dónde se absorben principalmente los nutrientes?', opciones:['Estómago','Boca','Intestino delgado','Intestino grueso'], correcta:2, exp:'El intestino delgado absorbe los nutrientes.'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Biología molecular',
        descripcion: 'ADN, expresión génica y biotecnología.',
        unidades:[
          { id:1, titulo:'El ADN', pct:0,
            temas:[
              { id:1, titulo:'Estructura del ADN', activo:true,
                contenido:'El ADN tiene doble hélice (Watson y Crick, 1953). Bases: A-T y G-C siempre van juntas (complementariedad).',
                formula:'Bases nitrogenadas:\nA — T (Adenina-Timina)\nG — C (Guanina-Citosina)\n\nSi cadena: AATGCC\nComplementaria: TTACGG',
                ejercicios:[
                  {pregunta:'Si ADN es AATGCC, ¿cadena complementaria?', opciones:['TTACGG','AATGCC','TTACCC','AAGCC'], correcta:0, exp:'A-T, A-T, T-A, G-C, C-G, C-G → TTACGG.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Ecología',
        descripcion: 'Ecosistemas, cadenas tróficas y cambio climático.',
        unidades:[
          { id:1, titulo:'Ecosistemas', pct:0,
            temas:[
              { id:1, titulo:'Cadenas tróficas', activo:true,
                contenido:'Un ecosistema es la interacción entre seres vivos y el ambiente. Las cadenas tróficas muestran el flujo de energía. Regla del 10%: solo el 10% pasa al siguiente nivel.',
                formula:'Productor → C.1° → C.2° → Descomponedor\nPasto → Vaca → León → Hongos\n\nRegla del 10%: se pierde 90% en cada nivel',
                ejercicios:[
                  {pregunta:'¿Qué organismo es siempre productor?', opciones:['León','Vaca','Planta','Hongo'], correcta:2, exp:'Las plantas fabrican materia orgánica con luz solar.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Biotecnología y bioética',
        descripcion: 'CRISPR, medicina personalizada y ética científica.',
        unidades:[
          { id:1, titulo:'CRISPR y biotecnología', pct:0,
            temas:[
              { id:1, titulo:'CRISPR: la tijera molecular', activo:true,
                contenido:'CRISPR-Cas9 edita el ADN con precisión sin precedentes. Doudna y Charpentier ganaron el Nobel 2020.',
                formula:'Cómo funciona CRISPR:\n1. ARN guía localiza secuencia\n2. Cas9 corta el ADN\n3. Célula repara el corte\n4. Podemos insertar/eliminar genes',
                ejercicios:[
                  {pregunta:'¿Quiénes ganaron el Nobel 2020 por CRISPR?', opciones:['Watson y Crick','Doudna y Charpentier','Mendel y Darwin','Pasteur y Koch'], correcta:1, exp:'Jennifer Doudna y Emmanuelle Charpentier, Nobel de Química 2020.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },

  historia: {
    nombre: 'Historia', emoji: '🗺️',
    color: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-600',
    tutor: { nombre: 'Profe Roberto', emoji: '🗺️', saludo: '¡Hola! Soy Roberto. La historia no son fechas — son decisiones humanas que moldearon el mundo.' },
    años: {
      1: {
        titulo: 'Prehistoria y civilizaciones antiguas',
        descripcion: 'Del origen humano a las grandes civilizaciones.',
        unidades:[
          { id:1, titulo:'La Prehistoria', pct:0,
            temas:[
              { id:1, titulo:'Paleolítico: cazadores y recolectores', activo:true,
                contenido:'Paleolítico (2,5 millones-10.000 a.C.): grupos nómades cazadores. Usaron fuego (~400.000 a.C.) y dejaron arte rupestre (Altamira, Lascaux).',
                formula:'Paleolítico:\n→ 2,5 millones-10.000 a.C.\n→ Nómades, cazadores-recolectores\n→ Piedra tallada\n→ Control del fuego\n→ Arte rupestre',
                ejercicios:[
                  {pregunta:'¿Cómo vivían los humanos del Paleolítico?', opciones:['Sedentarios','Nómades','Agricultores','Ciudadanos'], correcta:1, exp:'Eran nómades: se desplazaban siguiendo animales y alimentos.'},
                  {pregunta:'¿Qué hito ocurrió en el Paleolítico?', opciones:['La agricultura','El control del fuego','La escritura','La metalurgia'], correcta:1, exp:'El control del fuego fue transformador para la humanidad.'},
                ]
              },
              { id:2, titulo:'Neolítico: la revolución agrícola', bloqueado:true,
                contenido:'Neolítico (10.000-3.000 a.C.): la agricultura y ganadería permitieron el sedentarismo y el surgimiento de ciudades.',
                formula:'Neolítico:\n→ Agricultura y ganadería\n→ Sedentarismo\n→ Primeras ciudades\n→ Cerámica, tejido, comercio',
                ejercicios:[
                  {pregunta:'¿Qué permitió el sedentarismo en el Neolítico?', opciones:['La escritura','La agricultura y ganadería','El fuego','Los metales'], correcta:1, exp:'La agricultura les permitió producir alimentos en un lugar fijo.'},
                ]
              },
            ]
          },
          { id:2, titulo:'Mesopotamia y Egipto', pct:0, bloqueado:true,
            temas:[
              { id:1, titulo:'Mesopotamia: cuna de la civilización', bloqueado:true,
                contenido:'Entre Tigris y Éufrates (actual Iraq). Los sumerios inventaron la escritura cuneiforme (~3.200 a.C.) y el Código de Hammurabi.',
                formula:'Mesopotamia:\n→ Escritura cuneiforme (~3200 a.C.)\n→ Código de Hammurabi\n→ Rueda y arado\n→ Ciudades-estado: Ur, Uruk, Babilonia',
                ejercicios:[
                  {pregunta:'¿Qué escritura inventaron los sumerios?', opciones:['Jeroglífica','Cuneiforme','Alfabética','Pictográfica'], correcta:1, exp:'La escritura cuneiforme en tablillas de arcilla fue la primera conocida.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Edad Media y conquista',
        descripcion: 'Feudalismo, Renacimiento y conquista de América.',
        unidades:[
          { id:1, titulo:'El feudalismo', pct:0,
            temas:[
              { id:1, titulo:'Sistema feudal europeo', activo:true,
                contenido:'El feudalismo (siglos V-XV): el rey concedía tierras (feudos) a nobles a cambio de lealtad. Los campesinos trabajaban a cambio de protección.',
                formula:'REY → concede feudos\nNOBLES → subarrendan\nCABALLEROS → protegen\nSIERVOS → trabajan la tierra',
                ejercicios:[
                  {pregunta:'¿Qué recibían los nobles a cambio de lealtad al rey?', opciones:['Dinero','Tierras (feudos)','Ejércitos','Títulos'], correcta:1, exp:'El rey concedía feudos (tierras) a cambio de lealtad.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Argentina: colonia e independencia',
        descripcion: 'Conquista española y proceso independentista.',
        unidades:[
          { id:1, titulo:'Conquista y colonización', pct:0,
            temas:[
              { id:1, titulo:'La llegada de los españoles', activo:true,
                contenido:'1492: Colón llega a América. La conquista destruyó civilizaciones y estableció el sistema de encomienda. Buenos Aires: 1536 (Mendoza) y 1580 (Garay).',
                formula:'Llegada Colón: 1492\nFundación Buenos Aires: 1536 (Mendoza)\nRefundación: 1580 (Garay)\nEncomienda: trabajo forzado de indígenas',
                ejercicios:[
                  {pregunta:'¿En qué año llegó Colón a América?', opciones:['1492','1500','1519','1532'], correcta:0, exp:'Cristóbal Colón llegó el 12 de octubre de 1492.'},
                  {pregunta:'¿Quién refundó Buenos Aires en 1580?', opciones:['Pedro de Mendoza','Juan de Garay','Francisco Pizarro','Hernán Cortés'], correcta:1, exp:'Juan de Garay refundó Buenos Aires en 1580.'},
                ]
              },
              { id:2, titulo:'Revolución de Mayo', bloqueado:true,
                contenido:'25 de mayo de 1810: Primera Junta de Gobierno. Causas: crisis española por Napoleón, ideas ilustradas y malestar criollo.',
                formula:'Causas:\n→ Invasión napoleónica a España (1808)\n→ Ideas ilustradas\n→ Ejemplo EEUU (1776) y Francia (1789)\n→ Malestar criollo\n\n25/05/1810: Primera Junta\nPresidente: Cornelio Saavedra',
                ejercicios:[
                  {pregunta:'¿Qué evento europeo favoreció la Revolución?', opciones:['Revolución Francesa','Invasión napoleónica a España','Guerra con Portugal','Reforma protestante'], correcta:1, exp:'La invasión de Napoleón a España (1808) generó crisis de autoridad.'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Siglo XX: guerras mundiales',
        descripcion: 'Primera y Segunda Guerra Mundial, genocidios y derechos humanos.',
        unidades:[
          { id:1, titulo:'Guerras mundiales', pct:0,
            temas:[
              { id:1, titulo:'Primera Guerra Mundial', activo:true,
                contenido:'1914-1918: primer conflicto global. Causas (MANIA): Militarismo, Alianzas, Nacionalismo, Imperialismo, Asesinato de Francisco Fernando.',
                formula:'MANIA:\nMilitarismo\nAlianzas\nNacionalismo\nImperialismo\nAsesinato (Franz Ferdinand, 1914)\n\nEntente: Francia, RU, Rusia\nAlianza: Alemania, Austria-H., Italia',
                ejercicios:[
                  {pregunta:'¿Qué evento detonó la Primera Guerra?', opciones:['Hundimiento del Lusitania','Asesinato de Francisco Fernando','Invasión de Polonia','Crisis de los misiles'], correcta:1, exp:'El asesinato en Sarajevo el 28/06/1914 desencadenó el conflicto.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Argentina: dictadura y democracia',
        descripcion: 'Última dictadura cívico-militar y recuperación democrática.',
        unidades:[
          { id:1, titulo:'La dictadura (1976-1983)', pct:0,
            temas:[
              { id:1, titulo:'El golpe del 24 de marzo', activo:true,
                contenido:'24/03/1976: junta militar derroca al gobierno constitucional. 30.000 desaparecidos, 500+ niños robados, 340+ centros clandestinos.',
                formula:'24/03/1976: Golpe de Estado\nJunta: Videla, Massera, Agosti\n\nCrímenes:\n→ 30.000 desaparecidos\n→ 500+ niños robados\n→ ESMA y otros centros\n→ Exilio masivo\n\nMadres de Plaza de Mayo: resistencia',
                ejercicios:[
                  {pregunta:'¿Cuándo comenzó la última dictadura argentina?', opciones:['24/03/1976','25/05/1810','9/07/1816','10/12/1983'], correcta:0, exp:'El 24 de marzo de 1976 comenzó la última dictadura cívico-militar.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Historia global contemporánea',
        descripcion: 'Fin de la Guerra Fría, globalización y mundo multipolar.',
        unidades:[
          { id:1, titulo:'El mundo después de la Guerra Fría', pct:0,
            temas:[
              { id:1, titulo:'Caída del Muro de Berlín', activo:true,
                contenido:'9/11/1989: caída del Muro. Fin de la bipolaridad EEUU-URSS. Globalización acelerada. Emergencia de China como nueva potencia.',
                formula:'1989: caída del Muro de Berlín\n1991: disolución de la URSS\n2001: atentados del 11-S\n2008: crisis financiera global\n2020s: multipolaridad (China ascende)',
                ejercicios:[
                  {pregunta:'¿Cuándo cayó el Muro de Berlín?', opciones:['1989','1991','1987','1993'], correcta:0, exp:'El Muro de Berlín cayó el 9 de noviembre de 1989.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },

  geografia: {
    nombre: 'Geografía', emoji: '🌍',
    color: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600',
    tutor: { nombre: 'Profe Valeria', emoji: '🌍', saludo: '¡Hola! Soy Valeria. El mundo es más complejo y hermoso de lo que imaginás. Aprendamos a leerlo.' },
    años: {
      1: {
        titulo: 'La Tierra y Argentina',
        descripcion: 'Estructura terrestre, movimientos y regiones de Argentina.',
        unidades:[
          { id:1, titulo:'La Tierra', pct:0,
            temas:[
              { id:1, titulo:'Capas y movimientos', activo:true,
                contenido:'Capas: Corteza (donde vivimos), Manto, Núcleo externo (líquido, genera campo magnético), Núcleo interno (sólido, 5000°C). Rotación (24hs → día/noche). Traslación (365 días → estaciones).',
                formula:'CORTEZA: 5-70 km\nMANTO: hasta 2.900 km\nNÚCLEO EXTERNO: líquido, campo magnético\nNÚCLEO INTERNO: sólido\n\nRotación → día/noche\nTraslación → estaciones',
                ejercicios:[
                  {pregunta:'¿En qué capa vivimos?', opciones:['Manto','Núcleo','Corteza','Litosfera interna'], correcta:2, exp:'Vivimos en la corteza terrestre.'},
                  {pregunta:'¿Qué movimiento genera el día y la noche?', opciones:['Traslación','Rotación','Precesión','Nutación'], correcta:1, exp:'La rotación (giro sobre el eje en 24hs) genera día/noche.'},
                ]
              },
              { id:2, titulo:'Regiones de Argentina', bloqueado:true,
                contenido:'Argentina tiene 6 regiones: NOA (Puna), NEA (Selvas), Cuyo (Andes/vino), Pampa (llanura/agro), Patagonia (meseta/frío), Metropolitana (Buenos Aires).',
                formula:'NOA → Puna, Jujuy, Salta\nNEA → Selvas, Misiones\nCUYO → Mendoza, San Juan\nPAMPA → Buenos Aires, agropecuaria\nPATAGONIA → Sur, viento, frío\nMETROPOLITANA → Buenos Aires',
                ejercicios:[
                  {pregunta:'¿Qué región tiene más producción agropecuaria?', opciones:['NOA','Patagonia','Pampa','Cuyo'], correcta:2, exp:'La región pampeana concentra el 80% de la producción agropecuaria.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Población y recursos',
        descripcion: 'Demografía, urbanización y recursos naturales.',
        unidades:[
          { id:1, titulo:'Población mundial', pct:0,
            temas:[
              { id:1, titulo:'Demografía global', activo:true,
                contenido:'La población mundial supera los 8.000 millones (2022). Los países más poblados: India (1°), China (2°), EEUU (3°). Crecimiento: natalidad − mortalidad.',
                formula:'Crecimiento = Natalidad − Mortalidad\n\n1. India: 1.440 millones\n2. China: 1.400 millones\n3. EEUU: 340 millones\nArgentina: ~46 millones',
                ejercicios:[
                  {pregunta:'¿Qué país tiene más población actualmente?', opciones:['China','India','EEUU','Brasil'], correcta:1, exp:'India superó a China en 2023 con ~1.440 millones.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Geopolítica y bloques',
        descripcion: 'Bloques económicos, globalización y conflictos territoriales.',
        unidades:[
          { id:1, titulo:'Bloques económicos', pct:0,
            temas:[
              { id:1, titulo:'Los grandes bloques del mundo', activo:true,
                contenido:'UE: 27 países, moneda única. MERCOSUR: Argentina, Brasil, Uruguay, Paraguay. BRICS: economías emergentes en expansión.',
                formula:'UE: 27 países europeos, euro\nASEAN: 10 países del SE asiático\nMERCOSUR: Argentina+Brasil+Uruguay+Paraguay\nBRICS: Brasil, Rusia, India, China, SA',
                ejercicios:[
                  {pregunta:'¿Cuántos países integran la UE?', opciones:['25','27','30','28'], correcta:1, exp:'La UE tiene 27 países desde el Brexit (2020).'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Energía y recursos',
        descripcion: 'Fuentes de energía y transición energética.',
        unidades:[
          { id:1, titulo:'Energía y transición', pct:0,
            temas:[
              { id:1, titulo:'Energías renovables vs. fósiles', activo:true,
                contenido:'Los combustibles fósiles generan el 80% de la energía mundial pero producen CO2. Las renovables (solar, eólica, hidráulica) crecen exponencialmente.',
                formula:'NO renovables:\nPetróleo, gas, carbón, nuclear\n\nRENOVABLES:\nSolar, eólica, hidráulica\nGeotérmica, biomasa',
                ejercicios:[
                  {pregunta:'¿Cuál es una energía renovable?', opciones:['Petróleo','Gas natural','Energía solar','Carbón'], correcta:2, exp:'La energía solar proviene del Sol, fuente inagotable.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Cambio climático',
        descripcion: 'Efecto invernadero, consecuencias y políticas ambientales.',
        unidades:[
          { id:1, titulo:'Cambio climático', pct:0,
            temas:[
              { id:1, titulo:'El efecto invernadero aumentado', activo:true,
                contenido:'El efecto invernadero es natural y necesario. El problema es el aumento por combustibles fósiles: más CO2 → más calor retenido → calentamiento global.',
                formula:'Gases de efecto invernadero:\nCO2 → combustión fósiles\nCH4 → ganadería y residuos\nN2O → agricultura\n\nAcuerdo de París: máximo +1,5°C\nActual: ya +1,2°C',
                ejercicios:[
                  {pregunta:'¿Cuál es el principal GEI producido por humanos?', opciones:['Oxígeno','CO2','Nitrógeno','Argón'], correcta:1, exp:'El CO2 de combustibles fósiles es el principal responsable.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Geopolítica del siglo XXI',
        descripcion: 'Multipolaridad, China y desafíos del mundo actual.',
        unidades:[
          { id:1, titulo:'El mundo multipolar', pct:0,
            temas:[
              { id:1, titulo:'El ascenso de China', activo:true,
                contenido:'China es la 2ª economía mundial (1ª en PPP). La disputa EEUU-China redefine el orden global en tecnología, comercio y geopolítica.',
                formula:'China hoy:\n→ PIB: 2° mundial (PPP: 1°)\n→ Exportaciones: 1° del mundo\n→ "Cinturón y Ruta": 150 países\n→ Yuan: alternativa al dólar\n→ Ejército: 2° del mundo',
                ejercicios:[
                  {pregunta:'¿Qué puesto ocupa China en economías mundiales?', opciones:['1°','2°','3°','4°'], correcta:1, exp:'China es la 2ª economía por PIB nominal. En paridad de poder adquisitivo ya es la 1ª.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },

  ingles: {
    nombre: 'Inglés', emoji: '🗣️',
    color: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-600',
    tutor: { nombre: 'Profe James', emoji: '🗣️', saludo: "Hey! I'm James. English opens every door in the world. Let's make it yours!" },
    años: {
      1: {
        titulo: 'English Fundamentals',
        descripcion: 'Present Simple, vocabulary and daily routines.',
        unidades:[
          { id:1, titulo:'Present Simple & vocabulary', pct:0,
            temas:[
              { id:1, titulo:'Present Simple: affirmative', activo:true,
                contenido:'Present Simple para hábitos, rutinas y verdades. 3ª persona singular (he/she/it) agrega -s o -es.',
                formula:'I/You/We/They + verb\nHe/She/It + verb+s\n\nI work → He WORKS\nI have → He HAS (irregular)\nI am → He IS (irregular)',
                ejercicios:[
                  {pregunta:'"She ___ to school every day."', opciones:['go','goes','going','went'], correcta:1, exp:'She = 3ª persona → goes.'},
                  {pregunta:'"They ___ football on weekends."', opciones:['plays','playing','play','played'], correcta:2, exp:'They = plural → play (sin -s).'},
                ]
              },
              { id:2, titulo:'Present Simple: negatives & questions', bloqueado:true,
                contenido:'Negación: don\'t / doesn\'t + verb base. Preguntas: Do/Does + sujeto + verb?',
                formula:'I/you/we/they + DON\'T + verb\nhe/she/it + DOESN\'T + verb\n\nDo you work? / Does he work?\n(NOT: does he works?)',
                ejercicios:[
                  {pregunta:'"He ___ not eat meat."', opciones:['do','does','don\'t','is'], correcta:1, exp:'"Does" para he/she/it.'},
                  {pregunta:'"___ you like pizza?"', opciones:['Does','Do','Are','Have'], correcta:1, exp:'"Do" para I/you/we/they.'},
                ]
              },
              { id:3, titulo:'Daily routines vocabulary', bloqueado:true,
                contenido:'Verbos esenciales de rutinas diarias y adverbios de frecuencia.',
                formula:'wake up / get up / have breakfast\ngo to school / have lunch\ndo homework / have dinner / go to bed\n\nalways, usually, often, sometimes, never',
                ejercicios:[
                  {pregunta:'"Hacer la tarea" en inglés:', opciones:['make homework','do the homework','do homework','make the homework'], correcta:2, exp:'"Do homework" — sin artículo, verbo "do".'},
                  {pregunta:'"I ___ get up at 7am." (siempre)', opciones:['never','sometimes','always','often'], correcta:2, exp:'"Always" = siempre.'},
                ]
              },
            ]
          },
          { id:2, titulo:'Past Simple', pct:0, bloqueado:true,
            temas:[
              { id:1, titulo:'Regular & irregular verbs', bloqueado:true,
                contenido:'Verbos regulares: +ed. Irregulares: forma propia (go→went, have→had, see→saw).',
                formula:'REGULAR: work→worked, play→played\nstudy→studied, stop→stopped\n\nIRREGULAR:\ngo→went, come→came\nhave→had, see→saw, eat→ate',
                ejercicios:[
                  {pregunta:'Past simple of "go":', opciones:['goed','goes','went','gone'], correcta:2, exp:'"Go" es irregular → went.'},
                  {pregunta:'"Last night I ___ pizza." (eat)', opciones:['eated','eat','ate','eaten'], correcta:2, exp:'"Eat" es irregular → ate.'},
                ]
              },
            ]
          },
        ]
      },
      2: {
        titulo: 'Present Perfect & Comparatives',
        descripcion: 'Presente perfecto, comparativos y superlativos.',
        unidades:[
          { id:1, titulo:'Present Perfect', pct:0,
            temas:[
              { id:1, titulo:'Present Perfect: use and form', activo:true,
                contenido:'Conecta el pasado con el presente. Forma: have/has + participio pasado.',
                formula:'have/has + past participle\nI have worked / She has visited\n\nSignal words:\never, never, already, yet, just, for, since',
                ejercicios:[
                  {pregunta:'"Have you ever ___ Paris?" (visit)', opciones:['visited','visit','visiting','visits'], correcta:0, exp:'Present Perfect: have + past participle → visited.'},
                  {pregunta:'"I ___ just ___ my homework." (finish)', opciones:['have/finished','has/finished','did/finish','was/finishing'], correcta:0, exp:'"Just" → Present Perfect: have just finished.'},
                ]
              },
            ]
          },
        ]
      },
      3: {
        titulo: 'Conditionals & Modals',
        descripcion: 'Condicionales 0, 1° y 2°, y verbos modales.',
        unidades:[
          { id:1, titulo:'Conditionals', pct:0,
            temas:[
              { id:1, titulo:'Zero & First Conditional', activo:true,
                contenido:'Zero: verdades universales (if+present, present). First: situaciones posibles (if+present, will+verb).',
                formula:'ZERO: "If you heat water, it boils."\n(verdad científica)\n\nFIRST: "If it rains, I will stay home."\n(situación posible)',
                ejercicios:[
                  {pregunta:'"If you heat ice, it ___ melt." (Zero)', opciones:['will melt','melts','melted','would melt'], correcta:1, exp:'Zero Conditional: if + present → present.'},
                  {pregunta:'"If I study, I ___ pass." (First)', opciones:['would','will','can','might'], correcta:1, exp:'First: if + present → will + verb.'},
                ]
              },
              { id:2, titulo:'Second Conditional', bloqueado:true,
                contenido:'Situaciones hipotéticas/imaginarias: if + past simple, would + verb.',
                formula:'SECOND: "If I won the lottery, I would travel."\n(hipotético)\n\n"If I were you..." (consejo — always "were")',
                ejercicios:[
                  {pregunta:'"If I ___ rich, I would buy a house."', opciones:['am','was','were','would be'], correcta:2, exp:'Second Conditional: if + past → were.'},
                ]
              },
            ]
          },
        ]
      },
      4: {
        titulo: 'Advanced Grammar',
        descripcion: 'Voz pasiva, reported speech y escritura formal.',
        unidades:[
          { id:1, titulo:'Passive voice', pct:0,
            temas:[
              { id:1, titulo:'Voz pasiva: form and use', activo:true,
                contenido:'La voz pasiva cambia el foco al objeto. Forma: to be + past participle.',
                formula:'ACTIVE: The chef cooked the meal.\nPASSIVE: The meal was cooked.\n\nPresent: is/are + pp\nPast: was/were + pp\nFuture: will be + pp',
                ejercicios:[
                  {pregunta:'"The book ___ by Borges." (write)', opciones:['wrote','was written','is writing','written'], correcta:1, exp:'Pasiva en pasado: was + written.'},
                ]
              },
            ]
          },
        ]
      },
      5: {
        titulo: 'Academic English',
        descripcion: 'Escritura académica, presentaciones y certificaciones.',
        unidades:[
          { id:1, titulo:'Essay structure', pct:0,
            temas:[
              { id:1, titulo:'How to write an essay', activo:true,
                contenido:'Estructura: Introducción (hook + thesis), Cuerpo (topic sentence + evidence + analysis), Conclusión.',
                formula:'INTRO: Hook → Background → Thesis\n\nBODY: Topic sentence → Evidence → Analysis\n\nCONCLUSION: Restate thesis → Summary → Final thought',
                ejercicios:[
                  {pregunta:'What is a thesis statement?', opciones:['First sentence','Central argument of the essay','List of evidence','The conclusion'], correcta:1, exp:'The thesis presents the central argument the essay will defend.'},
                ]
              },
            ]
          },
        ]
      },
      6: {
        titulo: 'Professional English',
        descripcion: 'Business English, entrevistas y networking profesional.',
        unidades:[
          { id:1, titulo:'Professional English', pct:0,
            temas:[
              { id:1, titulo:'Job interviews: STAR technique', activo:true,
                contenido:'La técnica STAR responde preguntas de comportamiento: Situation, Task, Action, Result.',
                formula:'STAR:\nS - Situation: contexto\nT - Task: tu responsabilidad\nA - Action: qué hiciste\nR - Result: resultado\n\nCommon: "Tell me about yourself"\n"What are your strengths?"',
                ejercicios:[
                  {pregunta:'What does "STAR" stand for?', opciones:['Simple, Task, Action, Result','Situation, Task, Action, Result','Strategy, Task, Analysis, Result','Situation, Theory, Action, Review'], correcta:1, exp:'STAR: Situation, Task, Action, Result.'},
                ]
              },
            ]
          },
        ]
      },
    }
  },
};

export const getContenidoMateria = (materiaId, anio) => {
  const materia = CONTENIDO_EDUCATIVO[materiaId];
  if (!materia) return null;
  const datos = materia.años[anio];
  if (!datos) return null;
  return { ...materia, ...datos, unidades: datos.unidades };
};

export const getMateriasParaAnio = (anio) => {
  return Object.entries(CONTENIDO_EDUCATIVO)
    .filter(([, m]) => m.años[anio])
    .map(([id, m]) => ({
      id, nombre: m.nombre, emoji: m.emoji,
      color: m.color, text: m.text, bar: m.bar,
      tutor: m.tutor, pct: 0,
      unidad: m.años[anio]?.titulo || '',
    }));
};
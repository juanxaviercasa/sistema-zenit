# Storyboard PPT — Fórmula general con ejemplo numérico

## Cover
**Fórmula general: de los datos a las raíces**  
Ejemplo guiado: `2x² + 8x + 6 = 0`  
Sistema Zenit · UNI

## Slide 1
### 1. Planteamos el problema
**Objetivo:** entender la ecuación antes de introducir la fórmula.

**Composición:** una ecuación grande y centrada; una franja lateral breve con la pregunta “¿Qué raíces tiene?”; ningún cálculo todavía.

**Estado visible:** `2x² + 8x + 6 = 0`

**Estado oculto:** fórmula general, discriminante y resultados.

**Capas de animación posteriores:** fondo → título → ecuación → pregunta → pausa de observación.

## Slide 2
### 2. Relacionamos letras y datos
**Objetivo:** construir el mapa `a=2`, `b=8`, `c=6` sin confundir posiciones.

**Composición:** tres tarjetas separadas en una fila inferior; cada tarjeta tiene una variable, una flecha y su valor; la ecuación permanece arriba como ancla.

**Correspondencias:** `a` rojo coral con `2`; `b` azul con `8`; `c` verde con `6`.

**Capas de animación posteriores:** ecuación ancla → tarjeta a → tarjeta b → tarjeta c → pausa de recuperación.

## Slide 3
### 3. Fijamos la fórmula general
**Objetivo:** leer la fórmula como un mapa de sustitución.

**Composición:** fórmula grande al centro; tres llamadas discretas señalan `b`, `a` y `c`; todavía no aparecen los números.

**Estado visible:** `x = (-b ± √(b² − 4ac)) / 2a`

**Capas de animación posteriores:** fórmula → foco en `b` → foco en `a` → foco en `c` → estabilización.

## Slide 4
### 4. Sustituimos sin perder posiciones
**Objetivo:** mostrar qué dato entra en cada lugar de la fórmula.

**Composición:** dos columnas 60/40. La izquierda contiene la fórmula sustituida; la derecha conserva tres correspondencias compactas. Cada valor conserva el color de la variable durante la entrada.

**Estado visible:** `x = (−(8) ± √((8)² − 4(2)(6))) / 2(2)`

**Capas de animación posteriores:** fórmula → resaltar `b→8` → resaltar `a→2` → resaltar `c→6` → pausa.

## Slide 5
### 5. Calculamos el discriminante
**Objetivo:** separar el cálculo que vive dentro de la raíz.

**Composición:** dos columnas. Izquierda: `x = (−8 ± √Δ) / 4`. Derecha: tres filas con `8²=64`, `4·2·6=48`, `Δ=64−48=16`.

**Capas de animación posteriores:** 64 → 48 → 16 → pausa de procesamiento.

## Slide 6
### 6. Simplificamos la raíz
**Objetivo:** convertir `√16` en `4` y conservar el significado de `±`.

**Composición:** expresión grande, con `±` dentro de una cápsula dorada y una nota lateral corta: “dos ramas”.

**Estado visible:** `x = (−8 ± 4) / 4`

**Capas de animación posteriores:** raíz → resultado 4 → foco en ± → separación visual.

## Slide 7
### 7. Calculamos la primera raíz
**Objetivo:** resolver solo la rama positiva.

**Composición:** dos columnas. Izquierda: `x₁=(−8+4)/4=(−4)/4`. Derecha: tarjeta “Rama +” y resultado `x₁=−1`.

**Capas de animación posteriores:** rama positiva → −4 → división → resultado −1.

## Slide 8
### 8. Calculamos la segunda raíz
**Objetivo:** resolver la rama negativa sin mezclarla con la anterior.

**Composición:** izquierda con la memoria atenuada `x₁=−1` y el cálculo activo `x₂=(−8−4)/4=(−12)/4`; derecha con “Rama −” y `x₂=−3`.

**Capas de animación posteriores:** memoria breve → rama negativa → −12 → resultado −3.

## Slide 9
### 9. Verificamos las dos raíces
**Objetivo:** demostrar que ambas respuestas satisfacen la ecuación original.

**Composición:** dos tarjetas paralelas, una para `x₁=−1` y otra para `x₂=−3`; cada tarjeta termina visualmente en `=0`.

**Capas de animación posteriores:** verificación uno → cero → verificación dos → cero → pausa.

## Slide 10
### 10. Resultado final
**Objetivo:** consolidar las dos raíces y la secuencia de resolución.

**Composición:** resultado grande `x₁=−1`, `x₂=−3`; debajo, una línea de proceso: identificar → sustituir → calcular → separar → verificar.

**Capas de animación posteriores:** resultado → resumen de proceso → pausa final.

## Slide 11
### Del storyboard al video
**Objetivo:** mostrar cómo cada slide se convierte en capas animables.

**Sistema de capas:** fondo → título → ancla → estado matemático → foco semántico → guía → transición → pausa.

**Regla técnica:** cada objeto conserva id, zona, escala medida, objetivo pedagógico y cue temporal; ningún elemento entra a Manim o Remotion sin pasar la prueba de espacio.

**Proveedores:** Manim para escritura matemática y geometría; Remotion para composición web, transiciones y edición de capas; TTS por microstep para la narración.

> El PPT no es una presentación separada del video: es el contrato visual que permite revisar la escena antes de animarla.

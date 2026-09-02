/**
 * generateProblems.ts
 * -------------------
 * Erzeugt zufällige Divisionsaufgaben mit Rest für Grundschüler.
 *
 * Aufgabenformat:  Dividend ÷ Divisor = Ergebnis  Rest Restwert
 * Beispiel:         17      ÷    5    =    3      Rest   2
 *
 * Regeln:
 *  - Der Dividend ist immer ≤ 100 (Zahlenraum bis 100)
 *  - Der Divisor liegt zwischen 2 und 9 (sinnvoller Bereich für Grundschule)
 *  - Divisionen ohne Rest (Restwert = 0) sind erlaubt
 *  - Jede Aufgabe in einem Batch ist eindeutig (kein Duplikat)
 */

/** Eine einzelne Divisionsaufgabe */
export interface Problem {
  id: number        // Eindeutige ID für React-Keys
  dividend: number  // Die Zahl, die geteilt wird  (z.B. 17)
  divisor: number   // Die Zahl, durch die geteilt wird (z.B. 5)
  quotient: number  // Das ganzzahlige Ergebnis  (z.B. 3)
  remainder: number // Der Rest  (z.B. 2)
}

/** Zufällige ganze Zahl im Bereich [min, max] (inklusive) */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Erzeugt eine einzelne zufällige Divisionsaufgabe.
 * Der Dividend wird so gewählt, dass er ≤ maxDividend ist.
 */
function createOneProblem(id: number, maxDividend: number): Problem {
  const divisor = randomInt(2, 9)
  // Dividend zufällig wählen, aber mindestens so groß wie der Divisor
  const dividend = randomInt(divisor, maxDividend)
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend % divisor

  return { id, dividend, divisor, quotient, remainder }
}

/**
 * Erzeugt einen kompletten Satz von `count` einzigartigen Aufgaben.
 *
 * @param count       Anzahl der Aufgaben pro Runde (Standard: 10)
 * @param maxDividend Größter erlaubter Dividend (Standard: 100)
 * @returns           Array mit `count` zufälligen Divisionsaufgaben
 */
export function generateProblems(
  count: number = 10,
  maxDividend: number = 100,
): Problem[] {
  const problems: Problem[] = []
  // Bereits verwendete Kombinationen verhindern Duplikate
  const used = new Set<string>()

  let id = 0
  while (problems.length < count) {
    const p = createOneProblem(id, maxDividend)
    const key = `${p.dividend}÷${p.divisor}`

    if (!used.has(key)) {
      used.add(key)
      problems.push(p)
      id++
    }
  }

  return problems
}

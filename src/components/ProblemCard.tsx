/**
 * ProblemCard.tsx
 * ---------------
 * Zeigt eine einzelne Divisionsaufgabe an.
 *
 * Zustände einer Karte:
 *  - "offen"    → Kind kann Ergebnis und Rest eintragen
 *  - "richtig"  → Grüne Karte, gesperrt, Glückwunsch-Text
 *  - "falsch"   → Rote Karte, Hinweistext, kann erneut versucht werden
 */

import { useState, useRef, useEffect } from 'react'
import type { Problem } from '../logic/generateProblems'

interface Props {
  problem: Problem
  /** Wird aufgerufen, sobald die Aufgabe korrekt gelöst wurde */
  onSolved: (id: number) => void
}

export function ProblemCard({ problem, onSolved }: Props) {
  const { id, dividend, divisor, quotient, remainder } = problem

  // Eingaben des Kindes
  const [inputQuotient, setInputQuotient] = useState('')
  const [inputRemainder, setInputRemainder] = useState('')

  // Ergebnis der letzten Prüfung
  const [status, setStatus] = useState<'offen' | 'richtig' | 'falsch'>('offen')
  const [attempts, setAttempts] = useState(0)

  const quotientRef = useRef<HTMLInputElement>(null)

  // Fokus auf erstes Eingabefeld, wenn die Karte erscheint
  useEffect(() => {
    quotientRef.current?.focus()
  }, [])

  function handleCheck() {
    const q = parseInt(inputQuotient, 10)
    const r = parseInt(inputRemainder, 10)

    if (isNaN(q) || isNaN(r)) {
      setStatus('falsch')
      setAttempts((a) => a + 1)
      return
    }

    if (q === quotient && r === remainder) {
      // Korrekt!
      setStatus('richtig')
      onSolved(id)
    } else {
      // Falsch – Kind darf es erneut versuchen
      setStatus('falsch')
      setAttempts((a) => a + 1)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCheck()
  }

  const isLocked = status === 'richtig'

  return (
    <div className={`problem-card problem-card--${status}`}>
      {/* Aufgabennummer */}
      <span className="problem-card__number">#{id + 1}</span>

      {/* Aufgabenstellung: z.B. "17 ÷ 5 = ___ Rest ___" */}
      <div className="problem-card__equation">
        <span className="problem-card__big-number">{dividend}</span>
        <span className="problem-card__operator">÷</span>
        <span className="problem-card__big-number">{divisor}</span>
        <span className="problem-card__operator">=</span>

        {/* Eingabe: Ergebnis */}
        <input
          ref={quotientRef}
          className="problem-card__input"
          type="number"
          min="0"
          placeholder="?"
          value={inputQuotient}
          disabled={isLocked}
          onChange={(e) => {
            setInputQuotient(e.target.value)
            if (status === 'falsch') setStatus('offen')
          }}
          onKeyDown={handleKeyDown}
          aria-label="Ergebnis"
        />

        <span className="problem-card__rest-label">Rest</span>

        {/* Eingabe: Rest */}
        <input
          className="problem-card__input"
          type="number"
          min="0"
          placeholder="?"
          value={inputRemainder}
          disabled={isLocked}
          onChange={(e) => {
            setInputRemainder(e.target.value)
            if (status === 'falsch') setStatus('offen')
          }}
          onKeyDown={handleKeyDown}
          aria-label="Rest"
        />
      </div>

      {/* Feedback-Text */}
      {status === 'richtig' && (
        <p className="problem-card__feedback problem-card__feedback--richtig">
          Richtig! Super gemacht! ✓
        </p>
      )}
      {status === 'falsch' && (
        <p className="problem-card__feedback problem-card__feedback--falsch">
          {attempts === 1
            ? 'Nicht ganz – versuch es nochmal!'
            : 'Noch nicht richtig – du schaffst das!'}
        </p>
      )}

      {/* Prüfen-Button (nur sichtbar wenn noch nicht korrekt) */}
      {!isLocked && (
        <button
          className="problem-card__btn"
          onClick={handleCheck}
        >
          Prüfen
        </button>
      )}
    </div>
  )
}

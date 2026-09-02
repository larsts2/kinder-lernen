/**
 * App.tsx
 * -------
 * Hauptkomponente – verwaltet den gesamten Zustand der App.
 *
 * Zustandsfluss:
 *  1. App startet → generateProblems() erzeugt 10 zufällige Aufgaben
 *  2. Kind löst Aufgaben → solvedIds wächst
 *  3. Alle 10 gelöst → RewardBadge erscheint
 *  4. Kind klickt "Neue Aufgaben" → alles wird zurückgesetzt
 */

import { useState, useCallback } from 'react'
import { generateProblems } from './logic/generateProblems'
import { ProblemCard } from './components/ProblemCard'
import { ProgressBar } from './components/ProgressBar'
import { RewardBadge } from './components/RewardBadge'
import './App.css'

// Anzahl der Aufgaben pro Runde – hier leicht anpassbar
const PROBLEMS_PER_ROUND = 10

// Maximaler Dividend – hier leicht anpassbar (Zahlenraum)
const MAX_DIVIDEND = 100

export function App() {
  // Die aktuellen Aufgaben dieser Runde
  const [problems, setProblems] = useState(() =>
    generateProblems(PROBLEMS_PER_ROUND, MAX_DIVIDEND),
  )

  // IDs der bereits korrekt gelösten Aufgaben
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set())

  // Wird aufgerufen, wenn eine Aufgabe korrekt gelöst wurde
  const handleSolved = useCallback((id: number) => {
    setSolvedIds((prev) => new Set([...prev, id]))
  }, [])

  // Neue Runde: frische Aufgaben + Fortschritt zurücksetzen
  function startNewRound() {
    setProblems(generateProblems(PROBLEMS_PER_ROUND, MAX_DIVIDEND))
    setSolvedIds(new Set())
  }

  const solved = solvedIds.size
  const total = problems.length
  const isComplete = solved === total

  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <h1 className="app__title">Division mit Rest</h1>
        <p className="app__subtitle">
          Berechne das Ergebnis und den Rest!
        </p>
      </header>

      {/* Fortschrittsanzeige */}
      <div className="app__progress">
        <ProgressBar solved={solved} total={total} />
      </div>

      {/* Belohnungs-Abzeichen – erscheint wenn alle Aufgaben gelöst */}
      {isComplete && <RewardBadge onNewRound={startNewRound} />}

      {/* Aufgabengitter */}
      {!isComplete && (
        <>
          <div className="app__grid">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onSolved={handleSolved}
              />
            ))}
          </div>

          {/* Button für neue Aufgaben (auch schon vor 100%) */}
          <div className="app__actions">
            <button className="app__new-btn" onClick={startNewRound}>
              Neue Aufgaben
            </button>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * ProgressBar.tsx
 * ---------------
 * Zeigt den Fortschritt der aktuellen Runde an.
 *
 * Beispiel: "3 von 10 gelöst" + farbiger Balken (30 % gefüllt)
 */

interface Props {
  solved: number  // Anzahl bereits gelöster Aufgaben
  total: number   // Gesamtanzahl der Aufgaben in dieser Runde
}

export function ProgressBar({ solved, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((solved / total) * 100)

  return (
    <div className="progress">
      <div className="progress__label">
        <span>
          {solved} von {total} Aufgaben gelöst
        </span>
        <span className="progress__percent">{percent}&thinsp;%</span>
      </div>

      {/* Der Fortschrittsbalken */}
      <div className="progress__track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

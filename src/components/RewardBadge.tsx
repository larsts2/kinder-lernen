/**
 * RewardBadge.tsx
 * ---------------
 * Wird angezeigt, wenn das Kind alle Aufgaben einer Runde gelöst hat (100 %).
 *
 * Enthält eine CSS-Animation (definiert in App.css) und
 * einen Button, um eine neue Runde zu starten.
 */

interface Props {
  /** Wird aufgerufen, wenn das Kind auf "Neue Aufgaben" klickt */
  onNewRound: () => void
}

export function RewardBadge({ onNewRound }: Props) {
  return (
    <div className="reward" role="alert" aria-live="assertive">
      {/* Animierter Stern / Abzeichen */}
      <div className="reward__star">⭐</div>

      <h2 className="reward__title">Super gemacht!</h2>
      <p className="reward__text">
        Du hast alle Aufgaben richtig gelöst!<br />
        Das ist großartig – weiter so!
      </p>

      {/* Konfetti-Sterne (rein per CSS animiert, kein JS nötig) */}
      <div className="reward__confetti" aria-hidden="true">
        {['🎉', '🌟', '🎊', '✨', '🏆', '🎈', '💫', '🎀'].map((emoji, i) => (
          <span
            key={i}
            className="reward__confetti-piece"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <button className="reward__btn" onClick={onNewRound}>
        Neue Aufgaben
      </button>
    </div>
  )
}

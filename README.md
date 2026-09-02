# Kinder-Lernen: Division mit Rest

Eine einfache Mathe-Übungsseite für Grundschüler, die Division mit Rest üben möchten.

**Beispiel:** `17 ÷ 5 = 3 Rest 2`

---

## Starten (Entwicklungsmodus)

```bash
npm install
npm run dev
```

Dann im Browser öffnen: `http://localhost:5173`

## Bauen (statisches HTML)

```bash
npm run build
```

Das erzeugt den Ordner `docs/` mit:
- `index.html` – die Hauptseite
- `assets/app.js` – die gesamte Anwendungslogik
- `assets/app.css` – alle Stile

Die Dateien im `docs/`-Ordner können direkt auf jeden Webserver kopiert oder lokal im Browser geöffnet werden.

## Deployment via GitHub Pages

Der Build-Ordner heißt `docs/`, damit GitHub Pages ihn direkt aus dem Repository heraus ausliefern kann.

**Einmalige Einrichtung:**
1. `npm run build` ausführen und den `docs/`-Ordner committen und pushen
2. Im GitHub-Repository: **Settings → Pages**
3. Unter *Build and deployment* → Source: **Deploy from a branch**
4. Branch: `main` / Folder: `/docs` → **Save**

Nach wenigen Minuten ist die Seite unter `https://<dein-nutzername>.github.io/<repo-name>/` erreichbar.

**Update deployen:**
```bash
npm run build
git add docs/
git commit -m "build: update docs"
git push
```

GitHub Pages erkennt die Änderung automatisch und aktualisiert die Seite.

---

## Wie die App funktioniert

### Aufgaben-Generator (`src/logic/generateProblems.ts`)

Hier wird die Mathe-Logik erzeugt. Kernfunktion:

```ts
generateProblems(count, maxDividend)
```

| Parameter     | Standard | Bedeutung                          |
|---------------|----------|------------------------------------|
| `count`       | `10`     | Anzahl Aufgaben pro Runde          |
| `maxDividend` | `100`    | Größte erlaubte Zahl (Zahlenraum)  |

**So funktioniert es intern:**
1. Ein zufälliger Divisor (2–9) wird gewählt
2. Ein zufälliger Dividend (≤ maxDividend) wird gewählt
3. Ergebnis und Rest werden berechnet: `quotient = Math.floor(dividend / divisor)`, `remainder = dividend % divisor`
4. Doppelte Aufgaben werden vermieden

### Anpassen: Schwierigkeitsgrad

In `src/App.tsx` ganz oben:

```ts
const PROBLEMS_PER_ROUND = 10  // Aufgaben pro Runde ändern
const MAX_DIVIDEND = 100        // Zahlenraum ändern (z.B. 20 für Anfänger)
```

### Anpassen: Divisor-Bereich

In `src/logic/generateProblems.ts`, Funktion `createOneProblem`:

```ts
const divisor = randomInt(2, 9)  // z.B. auf randomInt(2, 4) für Anfänger
```

---

## Projektstruktur

```
kinder-lernen/
├── index.html                     # HTML-Einstiegspunkt
├── package.json                   # Abhängigkeiten und Skripte
├── vite.config.ts                 # Vite-Konfiguration
├── tsconfig.json                  # TypeScript-Konfiguration
└── src/
    ├── main.tsx                   # React-Einstiegspunkt
    ├── App.tsx                    # Hauptkomponente + globaler Zustand
    ├── App.css                    # Alle Stile (kindgerecht, bunt)
    ├── logic/
    │   └── generateProblems.ts   # Aufgaben-Generator (Mathe-Logik)
    └── components/
        ├── ProblemCard.tsx        # Eine einzelne Aufgaben-Karte
        ├── ProgressBar.tsx        # Fortschrittsanzeige (X von 10)
        └── RewardBadge.tsx        # Belohnungs-Abzeichen bei 100%
```

---

## Funktionen

- **Zufällige Aufgaben** im Zahlenraum bis 100
- **Sofort-Feedback** nach dem Prüfen (grün = richtig, rot = falsch)
- **Wiederholungsversuch** bei falschen Antworten
- **Fortschrittsbalken** zeigt wie viele Aufgaben gelöst wurden
- **Belohnungs-Badge** mit Animation wenn alle Aufgaben gelöst sind
- **"Neue Aufgaben"**-Button für eine frische Runde
- **Responsive** – funktioniert auf Tablet und Smartphone
- **Vollständig auf Deutsch**

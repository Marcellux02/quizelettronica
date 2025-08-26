# Quiz Elettronica

## Descrizione

Quiz Elettronica è un'applicazione web interattiva per testare le conoscenze in elettronica attraverso quiz con domande randomizzate del corso di Fondamenti di Elettronica. L'app utilizza React e Vite per un'esperienza utente fluida, con supporto per rendering di Markdown e LaTeX nelle spiegazioni fornite dall'API Gemini.

## Funzionalità Principali

- Selezione random di domande da un database JSON.
- Interfaccia utente moderna con transizioni e stili responsive.
- Spiegazioni dettagliate generate dall'IA (Gemini API) per risposte corrette/sbagliate.
- Rendering di formule matematiche con LaTeX.
- Opzioni per ripetere il quiz con le stesse domande o iniziarne uno nuovo.
- Indicatore di caricamento durante la generazione delle spiegazioni.

## Requisiti

- Node.js (versione 14 o superiore)
- Chiave API Gemini (configurabile tramite variabili d'ambiente)

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-utente/quizelettronica.git
   ```
2. Naviga nella directory del progetto:
   ```bash
   cd quizelettronica
   ```
3. Installa le dipendenze:
   ```bash
   npm install
   ```
4. Configura la chiave API Gemini in un file `.env`:
   ```
   VITE_GEMINI_API_KEY=la-tua-chiave-api
   ```

## Uso

- Avvia il server di sviluppo:
  ```bash
  npm run dev
  ```
- Apri il browser all'indirizzo `http://localhost:5173/quizelettronica/`.
- Inizia il quiz e visualizza i risultati con spiegazioni.

## Dipendenze

- React
- Vite
- react-latex-next
- react-markdown
- remark-math
- rehype-katex
- katex

## Contributi

Contributi sono benvenuti! Apri una issue o una pull request per suggerimenti o miglioramenti.

## Licenza

MIT License

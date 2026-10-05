<div align="center">

  # 🎮 NEON TIC-TAC-TOE

  <p align="center">
    <strong>A modern, cyber-aesthetic Tic-Tac-Toe web game featuring glassmorphism, responsive animations, intelligent AI, and synthesized Web Audio.</strong>
  </p>

  <p align="center">
    <a href="https://github.com/surbhi-sharma4/tic_tac_toe_game/stargazers"><img src="https://img.shields.io/github/stars/surbhi-sharma4/tic_tac_toe_game?color=00f2fe&style=for-the-badge" alt="Stars"></a>
    <a href="https://github.com/surbhi-sharma4/tic_tac_toe_game/network/members"><img src="https://img.shields.io/github/forks/surbhi-sharma4/tic_tac_toe_game?color=ff2d60&style=for-the-badge" alt="Forks"></a>
    <a href="https://github.com/surbhi-sharma4/tic_tac_toe_game/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="License"></a>
    <img src="https://img.shields.io/badge/Made%20With-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS">
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-game-modes">Game Modes</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-author--credits">Author</a>
  </p>

</div>

---

## 🌟 Overview

**Neon Tic-Tac-Toe** elevates the timeless 3×3 strategy board game into a sleek, futuristic digital arcade experience. Designed with cutting-edge CSS glassmorphism, dynamic ambient lighting, responsive touch & keyboard controls, and an unbeatable AI engine powered by the **Minimax Algorithm**.

No bulky frameworks, external CDNs, or heavy asset downloads—everything runs natively in the browser at a silky smooth 60+ FPS.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔮 **Neon Glassmorphic Design** | Deep slate palette with glowing ambient backdrops, luminous cyan (`X`) and neon rose (`O`) player markers. |
| 🤖 **Dual AI Opponents** | Play against a friendly casual AI or challenge the mathematically **Unbeatable Master AI** powered by Minimax. |
| 🔊 **Native Synthesized Audio** | Built-in sound effects generated in real-time via the browser's **Web Audio API** (zero MP3 files required). |
| 🎊 **Dynamic Celebrations** | Full-screen canvas particle confetti explosion and an animated SVG laser strike line connecting the winning combo. |
| 📊 **Persistent Score Tracking** | Tracks Player X, Player O, and Tie scores with instant `localStorage` synchronization across sessions. |
| 👻 **Ghost Previews** | Real-time hover preview that renders a translucent ghost of the active player's marker before placing a move. |
| ⌨️ **Keyboard Accessibility** | Full keyboard navigation (<kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>) and instant round restart with <kbd>R</kbd>. |

---

## 🕹️ Game Modes

```
┌────────────────────────────────────────────────────────┐
│                      SELECT MODE                       │
├───────────────────┬────────────────────┬───────────────┤
│    👥 2 Players   │  🤖 vs AI (Casual) │  🧠 vs AI     │
│   (Pass & Play)   │  (Balanced Fun)    │  (Unbeatable) │
└───────────────────┴────────────────────┴───────────────┘
```

1. **👥 2 Players (Pass & Play)**:
   - Challenge a friend on the same device with synchronized turn indicators and personal score tracking.
2. **🤖 vs AI (Casual)**:
   - A relaxed sparring partner that balances opportunistic blocks with randomized moves for casual fun.
3. **🧠 vs AI (Unbeatable Master)**:
   - Utilizes a recursive **Minimax Decision Tree Algorithm** that evaluates every branch of future board states. **It is mathematically impossible to defeat!**

---

## 🚀 Quick Start

### Option 1: Direct Browser Launch
Simply clone the repository and open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/surbhi-sharma4/tic_tac_toe_game.git

# Navigate into the project directory
cd tic_tac_toe_game

# Open in default browser (Windows)
start index.html

# Or on macOS / Linux
open index.html   # macOS
xdg-open index.html # Linux
```

### Option 2: Local HTTP Server
Run with your preferred development server:

```bash
# Using Node / npx
npx serve .

# Or using Python 3
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## 🛠️ Tech Stack & Implementation Details

```
   HTML5                CSS3                JavaScript           Web Audio API
┌──────────┐        ┌──────────┐        ┌────────────────┐      ┌──────────────┐
│ Semantic │  ───►  │ Glass UI │  ───►  │ Minimax Engine │ ───► │ Synthesizer  │
│ Elements │        │ & Glows  │        │ State & Events │      │  Sound FX    │
└──────────┘        └──────────┘        └────────────────┘      └──────────────┘
```

- **Markup**: Pure semantic HTML5 (`<main>`, `<section>`, `<nav>`, `<header>`, `role="grid"`, ARIA attributes) for high accessibility and SEO readiness.
- **Styling**: Vanilla CSS3 with custom properties (CSS variables), CSS Grid, Flexbox, backdrop-filter blur, SVG stroke dash animations, and keyframe motion.
- **Game Engine**: Modern ES6+ JavaScript class architecture (`SoundManager`, `ConfettiManager`, `TicTacToeGame`).
- **Audio Synthesizer**: Custom oscillator wave modulation (sine & triangle curves) generating crisp pops, fanfares, and swooshes on the fly.
- **Particle System**: HTML5 2D Canvas physics-based confetti engine with gravity, velocity drag, and rotation decay.

---

## 📁 Project Structure

```text
tic_tac_toe_game/
├── index.html       # Web structure, accessible grid markup, and modal components
├── style.css        # Neon design system, animations, media queries, and themes
├── app.js           # Core game engine, Minimax AI algorithm, audio & confetti
└── README.md        # Documentation and project showcase
```

---

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
| :---: | :--- |
| <kbd>R</kbd> | Instantly restart the current round |
| <kbd>Tab</kbd> / <kbd>Shift + Tab</kbd> | Navigate between board cells and control buttons |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Select or place mark on the focused tile |

---

## 👩‍💻 Author & Credits

<div align="center">

  Designed & Developed with ❤️ by

  ### **Surbhi Sharma**

  [![GitHub](https://img.shields.io/badge/GitHub-surbhi--sharma4-181717?style=for-the-badge&logo=github)](https://github.com/surbhi-sharma4)
  [![Repository](https://img.shields.io/badge/Repository-tic__tac__toe__game-00f2fe?style=for-the-badge&logo=git)](https://github.com/surbhi-sharma4/tic_tac_toe_game)

  *If you enjoyed playing this game, consider leaving a ⭐ star on the repository!*

</div>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn, and build upon it!

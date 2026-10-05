# Neon Tic-Tac-Toe

A modern, responsive, and aesthetic Tic-Tac-Toe web application built with vanilla HTML5, CSS3, and JavaScript.

![Game Preview](https://img.shields.io/badge/Status-Completed-success)
![Vanilla JS](https://img.shields.io/badge/Language-HTML5%20%7C%20CSS3%20%7C%20JS-blue)

## Features

- **Cyber Neon Design**: Glassmorphic UI with floating ambient glows, neon cyan & pink player markers, and smooth micro-animations.
- **Multiple Game Modes**:
  - **2 Players (Pass & Play)**: Local turn-based multiplayer.
  - **vs AI (Casual)**: An accessible AI opponent that balances random choices and smart tactical blocks.
  - **vs AI (Unbeatable Master)**: Minimax algorithm implementation that never loses.
- **Real-Time Scoreboard**: Persistent score tracking for Player X, Player O, and Ties via `localStorage`.
- **Dynamic Winning Strike**: Animated SVG line that connects winning rows, columns, or diagonals.
- **Victory Confetti & Chimes**: Built-in canvas particle confetti and synthesized audio effects powered by the Web Audio API (zero external assets needed).
- **Keyboard Friendly**: Press <kbd>R</kbd> anytime to restart the round. Tab and Enter key support for board navigation.

## Project Structure

```
├── index.html     # Semantic markup and accessible UI components
├── style.css      # Dark glassmorphic design system and animations
├── app.js         # Core game logic, AI engine (minimax), audio, & confetti
└── README.md      # Documentation
```

## How to Run

1. Open `index.html` directly in any modern web browser:
   - Double-click `index.html` or drag it into Chrome/Edge/Firefox.
2. Alternatively, serve locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```

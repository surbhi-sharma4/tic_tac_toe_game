/**
 * Neon Tic-Tac-Toe Game Engine
 * Features: Local 2-Player, Casual AI, Unbeatable AI (Minimax),
 * Web Audio sound synthesis, particle confetti, SVG winning strike line.
 */

(function () {
  'use strict';

  // --- Sound Effects using Web Audio API ---
  class SoundManager {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playMove(player) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      if (player === 'X') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
      }

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    playWin() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + index * 0.09;
        const dur = 0.22;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + dur);
      });
    }

    playDraw() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    }

    playReset() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    }
  }

  // --- Confetti Celebration ---
  class ConfettiManager {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    fire() {
      this.resize();
      const colors = ['#00f2fe', '#4facfe', '#ff2d60', '#ff758c', '#f59e0b', '#10b981', '#ffffff'];
      this.particles = [];

      const count = 90;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width * 0.5 + (Math.random() * 80 - 40),
          y: this.canvas.height * 0.5 + (Math.random() * 80 - 40),
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.7) * 18 - 4,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.35,
          drag: 0.98,
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008
        });
      }

      if (this.animationId) cancelAnimationFrame(this.animationId);
      this.animate();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let alive = false;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.alpha <= 0) continue;

        alive = true;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        this.ctx.restore();
      }

      if (alive) {
        this.animationId = requestAnimationFrame(() => this.animate());
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    clear() {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = [];
    }
  }

  // --- SVG Icons ---
  const SVG_MARK_X = `
    <svg viewBox="0 0 100 100" fill="none" stroke-width="12" stroke-linecap="round">
      <line x1="20" y1="20" x2="80" y2="80"></line>
      <line x1="80" y1="20" x2="20" y2="80"></line>
    </svg>
  `;

  const SVG_MARK_O = `
    <svg viewBox="0 0 100 100" fill="none" stroke-width="12" stroke-linecap="round">
      <circle cx="50" cy="50" r="32"></circle>
    </svg>
  `;

  // Winning combinations and strike line coordinates for 300x300 viewBox
  const WINNING_COMBOS = [
    // Rows
    { combo: [0, 1, 2], line: { x1: 25, y1: 50, x2: 275, y2: 50 } },
    { combo: [3, 4, 5], line: { x1: 25, y1: 150, x2: 275, y2: 150 } },
    { combo: [6, 7, 8], line: { x1: 25, y1: 250, x2: 275, y2: 250 } },
    // Columns
    { combo: [0, 3, 6], line: { x1: 50, y1: 25, x2: 50, y2: 275 } },
    { combo: [1, 4, 7], line: { x1: 150, y1: 25, x2: 150, y2: 275 } },
    { combo: [2, 5, 8], line: { x1: 250, y1: 25, x2: 250, y2: 275 } },
    // Diagonals
    { combo: [0, 4, 8], line: { x1: 30, y1: 30, x2: 270, y2: 270 } },
    { combo: [2, 4, 6], line: { x1: 270, y1: 30, x2: 30, y2: 270 } }
  ];

  // --- Main Game App ---
  class TicTacToeGame {
    constructor() {
      // DOM Elements
      this.cells = document.querySelectorAll('.cell');
      this.boardEl = document.getElementById('board');
      this.turnDotEl = document.getElementById('turn-dot');
      this.turnTextEl = document.getElementById('turn-text');
      this.playerXCard = document.getElementById('player-x-card');
      this.playerOCard = document.getElementById('player-o-card');
      this.nameXEl = document.getElementById('name-x');
      this.nameOEl = document.getElementById('name-o');
      this.scoreXEl = document.getElementById('score-x');
      this.scoreOEl = document.getElementById('score-o');
      this.scoreTiesEl = document.getElementById('score-ties');
      this.modeTabs = document.querySelectorAll('.mode-tab');
      this.resetRoundBtn = document.getElementById('reset-round-btn');
      this.resetScoresBtn = document.getElementById('reset-scores-btn');
      this.soundToggleBtn = document.getElementById('sound-toggle-btn');
      this.soundIconOn = document.getElementById('sound-icon-on');
      this.soundIconOff = document.getElementById('sound-icon-off');

      // Strike Line Elements
      this.strikeSvg = document.getElementById('winning-strike-svg');
      this.strikeLine = document.getElementById('strike-line');

      // Modal Elements
      this.resultModal = document.getElementById('result-modal');
      this.modalHeadline = document.getElementById('modal-headline');
      this.modalSubtitle = document.getElementById('modal-subtitle');
      this.modalBadge = document.getElementById('modal-badge');
      this.modalPlayAgainBtn = document.getElementById('modal-play-again-btn');
      this.modalCloseBtn = document.getElementById('modal-close-btn');

      // Canvas
      const canvasEl = document.getElementById('confetti-canvas');
      this.confetti = new ConfettiManager(canvasEl);
      this.sound = new SoundManager();

      // State
      this.board = Array(9).fill('');
      this.currentPlayer = 'X';
      this.isGameActive = true;
      this.gameMode = 'pvp'; // 'pvp' | 'ai-easy' | 'ai-hard'
      this.isAiThinking = false;

      // Scores
      this.scores = this.loadScores();

      // Init
      this.initEventListeners();
      this.updateScoreDisplay();
      this.updatePlayerLabels();
      this.updateTurnUI();
      this.updateCellHoverGhosts();
    }

    loadScores() {
      try {
        const saved = localStorage.getItem('neonttt_scores');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            X: parsed.X || 0,
            O: parsed.O || 0,
            ties: parsed.ties || 0
          };
        }
      } catch (e) {
        // Fallback
      }
      return { X: 0, O: 0, ties: 0 };
    }

    saveScores() {
      try {
        localStorage.setItem('neonttt_scores', JSON.stringify(this.scores));
      } catch (e) {}
    }

    initEventListeners() {
      // Cell clicks
      this.cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
          const index = parseInt(cell.getAttribute('data-index'), 10);
          this.handleCellClick(index);
        });

        // Keyboard navigation
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const index = parseInt(cell.getAttribute('data-index'), 10);
            this.handleCellClick(index);
          }
        });
      });

      // Mode tabs
      this.modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.getAttribute('data-mode');
          this.setMode(mode);
        });
      });

      // Action buttons
      this.resetRoundBtn.addEventListener('click', () => {
        this.sound.playReset();
        this.resetRound();
      });

      this.resetScoresBtn.addEventListener('click', () => {
        this.scores = { X: 0, O: 0, ties: 0 };
        this.saveScores();
        this.updateScoreDisplay();
        this.sound.playReset();
        this.resetRound();
      });

      // Sound button
      this.soundToggleBtn.addEventListener('click', () => {
        const isEnabled = this.sound.toggle();
        this.soundIconOn.classList.toggle('hidden', !isEnabled);
        this.soundIconOff.classList.toggle('hidden', isEnabled);
        this.soundToggleBtn.setAttribute('title', isEnabled ? 'Sound: ON' : 'Sound: OFF');
      });

      // Modal buttons
      this.modalPlayAgainBtn.addEventListener('click', () => {
        this.closeModal();
        this.sound.playReset();
        this.resetRound();
      });

      this.modalCloseBtn.addEventListener('click', () => {
        this.closeModal();
      });

      // Global keyboard shortcut
      window.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
          // Restart round if not in an input
          if (document.activeElement.tagName !== 'INPUT') {
            this.sound.playReset();
            this.resetRound();
          }
        }
      });
    }

    setMode(mode) {
      if (this.gameMode === mode) return;
      this.gameMode = mode;

      this.modeTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-mode') === mode);
      });

      this.updatePlayerLabels();
      this.resetRound();
    }

    updatePlayerLabels() {
      if (this.gameMode === 'pvp') {
        this.nameXEl.textContent = 'Player 1';
        this.nameOEl.textContent = 'Player 2';
      } else if (this.gameMode === 'ai-easy') {
        this.nameXEl.textContent = 'You (X)';
        this.nameOEl.textContent = 'AI Casual';
      } else {
        this.nameXEl.textContent = 'You (X)';
        this.nameOEl.textContent = 'AI Master';
      }
    }

    updateScoreDisplay() {
      this.scoreXEl.textContent = this.scores.X;
      this.scoreOEl.textContent = this.scores.O;
      this.scoreTiesEl.textContent = this.scores.ties;
    }

    updateTurnUI() {
      if (!this.isGameActive) return;

      const isX = this.currentPlayer === 'X';
      this.turnDotEl.className = `turn-dot ${isX ? 'turn-dot-x' : 'turn-dot-o'}`;

      let playerLabel = '';
      if (this.gameMode === 'pvp') {
        playerLabel = isX ? "Player 1's" : "Player 2's";
      } else {
        playerLabel = isX ? 'Your' : (this.gameMode === 'ai-easy' ? 'AI Casual' : 'AI Master');
      }

      this.turnTextEl.innerHTML = `<strong class="${isX ? 'highlight-x' : 'highlight-o'}">${this.currentPlayer}</strong> &bull; ${playerLabel} Turn`;

      this.playerXCard.classList.toggle('active-glow', isX);
      this.playerOCard.classList.toggle('active-glow', !isX);
    }

    updateCellHoverGhosts() {
      const ghostClass = this.currentPlayer === 'X' ? 'ghost-x' : 'ghost-o';
      this.cells.forEach(cell => {
        cell.classList.remove('ghost-x', 'ghost-o');
        if (!cell.classList.contains('taken') && this.isGameActive && !this.isAiThinking) {
          cell.classList.add(ghostClass);
        }
      });
    }

    handleCellClick(index) {
      if (!this.isGameActive || this.board[index] !== '' || this.isAiThinking) {
        return;
      }

      this.makeMove(index, this.currentPlayer);

      // Check win/draw
      const winResult = this.checkWin(this.board, this.currentPlayer);
      if (winResult) {
        this.handleGameEnd('win', winResult);
        return;
      }

      if (this.isBoardFull(this.board)) {
        this.handleGameEnd('draw');
        return;
      }

      // Switch turn
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateTurnUI();
      this.updateCellHoverGhosts();

      // Trigger AI turn if applicable
      if (this.isGameActive && this.gameMode !== 'pvp' && this.currentPlayer === 'O') {
        this.triggerAiMove();
      }
    }

    makeMove(index, player) {
      this.board[index] = player;
      const cell = this.cells[index];
      cell.classList.add('taken', player === 'X' ? 'mark-x' : 'mark-o');
      cell.setAttribute('aria-label', `Cell marked with ${player}`);
      cell.innerHTML = player === 'X' ? SVG_MARK_X : SVG_MARK_O;

      this.sound.playMove(player);
    }

    triggerAiMove() {
      this.isAiThinking = true;
      this.turnTextEl.innerHTML = `<strong class="highlight-o">AI</strong> is thinking...`;
      this.updateCellHoverGhosts();

      // Slight natural delay for realism
      const delay = Math.random() * 250 + 350;
      setTimeout(() => {
        if (!this.isGameActive) {
          this.isAiThinking = false;
          return;
        }

        let bestIndex;
        if (this.gameMode === 'ai-easy') {
          bestIndex = this.getCasualAiMove();
        } else {
          bestIndex = this.getUnbeatableAiMove();
        }

        this.isAiThinking = false;
        if (bestIndex !== undefined && bestIndex !== -1) {
          this.makeMove(bestIndex, 'O');

          const winResult = this.checkWin(this.board, 'O');
          if (winResult) {
            this.handleGameEnd('win', winResult);
            return;
          }

          if (this.isBoardFull(this.board)) {
            this.handleGameEnd('draw');
            return;
          }

          this.currentPlayer = 'X';
          this.updateTurnUI();
          this.updateCellHoverGhosts();
        }
      }, delay);
    }

    getCasualAiMove() {
      // 50% chance: play smartly (win or block), otherwise pick random
      if (Math.random() < 0.5) {
        // Can AI win?
        for (let i = 0; i < 9; i++) {
          if (this.board[i] === '') {
            this.board[i] = 'O';
            if (this.checkWin(this.board, 'O')) {
              this.board[i] = '';
              return i;
            }
            this.board[i] = '';
          }
        }
        // Block player X
        for (let i = 0; i < 9; i++) {
          if (this.board[i] === '') {
            this.board[i] = 'X';
            if (this.checkWin(this.board, 'X')) {
              this.board[i] = '';
              return i;
            }
            this.board[i] = '';
          }
        }
      }

      // Random available spot
      const emptyIndices = [];
      this.board.forEach((val, i) => {
        if (val === '') emptyIndices.push(i);
      });
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    getUnbeatableAiMove() {
      // Minimax with optimal play
      let bestScore = -Infinity;
      let move = -1;

      for (let i = 0; i < 9; i++) {
        if (this.board[i] === '') {
          this.board[i] = 'O';
          const score = this.minimax(this.board, 0, false);
          this.board[i] = '';
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      return move;
    }

    minimax(board, depth, isMaximizing) {
      if (this.checkWin(board, 'O')) return 10 - depth;
      if (this.checkWin(board, 'X')) return depth - 10;
      if (this.isBoardFull(board)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === '') {
            board[i] = 'O';
            const score = this.minimax(board, depth + 1, false);
            board[i] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === '') {
            board[i] = 'X';
            const score = this.minimax(board, depth + 1, true);
            board[i] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    checkWin(board, player) {
      for (const item of WINNING_COMBOS) {
        const [a, b, c] = item.combo;
        if (board[a] === player && board[b] === player && board[c] === player) {
          return item;
        }
      }
      return null;
    }

    isBoardFull(board) {
      return board.every(cell => cell !== '');
    }

    handleGameEnd(type, winData = null) {
      this.isGameActive = false;

      if (type === 'win') {
        const winner = this.currentPlayer;
        this.scores[winner]++;
        this.saveScores();
        this.updateScoreDisplay();

        // Highlight cells
        winData.combo.forEach(idx => {
          this.cells[idx].classList.add('winner-cell');
        });

        // Show winning strike SVG line
        this.drawStrikeLine(winData.line, winner);

        // Sound & Confetti
        this.sound.playWin();
        this.confetti.fire();

        // Banner text
        let winnerName = '';
        if (this.gameMode === 'pvp') {
          winnerName = winner === 'X' ? 'Player 1' : 'Player 2';
        } else {
          winnerName = winner === 'X' ? 'You' : (this.gameMode === 'ai-easy' ? 'Casual AI' : 'Master AI');
        }

        const colorClass = winner === 'X' ? 'highlight-x' : 'highlight-o';
        this.turnTextEl.innerHTML = `🎉 <strong class="${colorClass}">${winnerName}</strong> Wins!`;

        // Open celebration modal with delay
        setTimeout(() => {
          this.openModal({
            badge: winner === 'X' ? '🏆' : (this.gameMode === 'pvp' ? '🎉' : '🤖'),
            title: `${winnerName} Wins!`,
            desc: winner === 'X'
              ? 'Awesome moves! Outstanding strategy and victory.'
              : 'Tough opponent! Better luck next round.'
          });
        }, 500);

      } else {
        // Draw
        this.scores.ties++;
        this.saveScores();
        this.updateScoreDisplay();

        this.sound.playDraw();
        this.turnTextEl.innerHTML = `🤝 It's a <strong>Draw!</strong>`;

        setTimeout(() => {
          this.openModal({
            badge: '🤝',
            title: `It's a Draw!`,
            desc: 'A fiercely contested battle. Evenly matched!'
          });
        }, 400);
      }

      this.updateCellHoverGhosts();
    }

    drawStrikeLine(coords, winner) {
      this.strikeLine.setAttribute('x1', coords.x1);
      this.strikeLine.setAttribute('y1', coords.y1);
      this.strikeLine.setAttribute('x2', coords.x2);
      this.strikeLine.setAttribute('y2', coords.y2);

      this.strikeLine.className = `strike-line ${winner === 'X' ? 'stroke-x' : 'stroke-o'}`;
      this.strikeSvg.classList.add('active');
    }

    openModal({ badge, title, desc }) {
      this.modalBadge.textContent = badge;
      this.modalHeadline.textContent = title;
      this.modalSubtitle.textContent = desc;
      this.resultModal.classList.remove('hidden');
    }

    closeModal() {
      this.resultModal.classList.add('hidden');
    }

    resetRound() {
      this.board = Array(9).fill('');
      this.isGameActive = true;
      this.isAiThinking = false;
      this.currentPlayer = 'X';

      // Reset cells
      this.cells.forEach(cell => {
        cell.className = 'cell';
        cell.innerHTML = '';
        cell.setAttribute('aria-label', `Empty cell`);
      });

      // Reset strike line
      this.strikeSvg.classList.remove('active');

      // Clear confetti
      this.confetti.clear();

      // Close modal if open
      this.closeModal();

      // Update UI
      this.updateTurnUI();
      this.updateCellHoverGhosts();
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TicTacToeGame());
  } else {
    new TicTacToeGame();
  }
})();

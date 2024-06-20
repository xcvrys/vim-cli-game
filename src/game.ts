import { Controls } from "./controls.ts";

export class Game {
  private controls: Controls;
  private playerPosition = { x: 0, y: 0 };
  private targetPosition = { x: 0, y: 0 };
  private score = 0;
  private readonly width = 20;
  private readonly height = 10;
  private gameStartTime = 0;
  private lastScoreTime = 0;
  private totalScoreTime = 0;

  constructor() {
    this.controls = new Controls();
  }

  start() {
    this.gameStartTime = Date.now();
    this.lastScoreTime = this.gameStartTime;
    this.resetPositions();
    this.drawScreen();

    this.controls.listen((direction: string) => {
      this.movePlayer(direction);
      this.checkPosition();
      this.drawScreen();
    });
  }

  movePlayer(direction: string) {
    const match = direction.match(/^(\d*)([hjkl])$/);
    if (!match) return;

    const num = parseInt(match[1], 10) || 1;
    const action = match[2];
    const { x, y } = this.playerPosition;

    switch (action) {
      case 'h':
        this.playerPosition.x = Math.max(x - num, 0);
        break;
      case 'j':
        this.playerPosition.y = Math.min(y + num, this.height - 1);
        break;
      case 'k':
        this.playerPosition.y = Math.max(y - num, 0);
        break;
      case 'l':
        this.playerPosition.x = Math.min(x + num, this.width - 1);
        break;
    }
  }


  checkPosition() {
    if (this.playerPosition.x === this.targetPosition.x && this.playerPosition.y === this.targetPosition.y) {
      this.score++;
      const now = Date.now();
      const scoreTime = now - this.lastScoreTime;
      this.totalScoreTime += scoreTime;
      this.lastScoreTime = now;
      this.resetTargetPosition();
    }
  }

  resetPositions() {
    this.playerPosition = this.randomPosition();
    this.targetPosition = this.randomPosition();
  }

  resetTargetPosition() {
    this.targetPosition = this.randomPosition();
  }

  randomPosition() {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
    };
  }

  drawScreen() {
    console.clear();
    for (let y = 0; y < this.height; y++) {
      let line = '';

      let relativeLineNumber = Math.abs(y - this.playerPosition.y);
      let currentLineNumber = y + 1;

      if (relativeLineNumber === 0) {
        line += currentLineNumber.toString().padStart(2, ' ');
      } else {
        line += '\u001b[90m' + `${relativeLineNumber.toString().padStart(2, ' ')}` + '\u001b[0m';
      }
      for (let x = 0; x < this.width; x++) {
        if (this.targetPosition.x === x && this.targetPosition.y === y) {
          line += 'X';
        } else if (this.playerPosition.x === x && this.playerPosition.y === y) {
          line += '\u001b[42m\u001b[30mP\u001b[0m';
        } else {
          line += '‎';
        }
      }
      process.stdout.write(line + '\u001b[90m|\u001b[0m\n');
    }
    this.drawBottomLine();
  }

  drawBottomLine() {
    const modeText = '\u001b[42m\u001b[30m--NORMAL--\u001b[0m';
    const scoreText = `\u001b[42m\u001b[30mSCORE: ${this.score}\u001b[0m`;
    const averageScoreTime = this.score ? (this.totalScoreTime / this.score / 1000).toFixed(2) : '0.00';
    const averageScoreTimeText = `\u001b[42m\u001b[30mAVG TIME PER SCORE: ${averageScoreTime} s\u001b[0m`;
    process.stdout.write(`\n${modeText}  ${scoreText}  ${averageScoreTimeText} \n`);
  }
}
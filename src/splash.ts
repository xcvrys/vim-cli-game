import { Interface, createInterface } from 'readline';

import { Controls } from './controls.ts';

export class Splash {
  private rl: Interface;
  private controls: Controls;

  constructor() {
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.controls = new Controls();
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      console.clear();
      this.rl.write('Welcome to the vim movement practice game\n');

      this.rl.write('The goal of this game is to move the character(\u001b[42m\u001b[30mP\u001b[0m) to the point(X)\n\n');

      this.rl.write('Use the following keys to move around:\n');
      this.rl.write('  \u001b[32mh\u001b[0m - move left\n');
      this.rl.write('  \u001b[32mj\u001b[0m - move down\n');
      this.rl.write('  \u001b[32mk\u001b[0m - move up\n');
      this.rl.write('  \u001b[32ml\u001b[0m - move right\n\n');

      this.rl.write('Press \u001b[32mctrl+c\u001b[0m to exit the game\n');

      this.rl.write('Press \u001b[32mreturn\u001b[0m to start the game\n');

      this.controls.listen((key: string) => {
        if (key === 'return') {
          this.rl.close();
          resolve();
        }
      });
    });
  }
}
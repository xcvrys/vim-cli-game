import { Interface, createInterface, emitKeypressEvents } from 'readline';

export class Controls {
  private rl: Interface;

  constructor() {
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    this.rl.on('SIGINT', () => {
      process.exit();
    });
  }

  listen(callback: (direction: string) => void) {
    let buffer = '';
    process.stdin.on('keypress', (str, key) => {
      if (key && key.ctrl && key.name === 'c') {
      } else if (/[0-9]/.test(str)) {
        buffer += str;
      } else if (key && key.name === 'return') {
        callback(key.name);
      } else {
        if (buffer !== '') {
          const direction = buffer + (key ? key.name : '');
          callback(direction);
          buffer = '';
        } else if (key && key.name) {
          callback(key.name);
        }
      }
    });
  }
}

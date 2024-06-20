import { Game } from './game.ts';
import { Splash } from './splash.ts';

async function startGameLoop() {
  const splash = new Splash();
  await splash.start();

  const game = new Game();
  game.start();
}

startGameLoop();
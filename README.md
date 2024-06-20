# vim-cli

This is a command-line game to practice vim movement. The goal of the game is to move the character (`P`) to the point (`X`).

![Gameplay](https://i.imgur.com/8MbKcQD.gif)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd vim-cli
npm install
```

## How to Play

You can start the game by running the following command:

```bash
npm start
```

Once the game starts, you will see a screen with your character (P) and a target point (X). Your goal is to move your character to the target point.

Use the following keys to move around:

- `h` - move left
- `j` - move down
- `k` - move up
- `l` - move right

Press `ctrl+c` to exit the game.

## Game Screen

The game screen is drawn using the `Game.drawScreen` method in the Game class. The player's position and the target position are marked on the screen. The bottom line of the screen displays the game mode, the current score, and the average time per score.

## Development

This project is written in TypeScript. You can find the main game logic in the Game class. The game loop is started in the `startGameLoop` function.

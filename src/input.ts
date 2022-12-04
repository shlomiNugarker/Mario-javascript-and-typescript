import { Game } from './main'

export class InputHandler {
  keys: string[]
  game: Game

  constructor(game: Game) {
    this.keys = []
    this.game = game
  }
}

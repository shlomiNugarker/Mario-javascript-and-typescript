import { Game } from './main'

// enum:
const states = {
  STANDING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  DIVING: 4,
}
console.log(states)

export class State {
  state: string
  game: Game

  constructor(state: string, game: Game) {
    this.state = state
    this.game = game
  }
}

export class Standing extends State {
  constructor(game: Game) {
    super('STANDING', game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.frameY = 0
    this.game.player.maxFrame = 0
  }

  handleInput(_input: string[]) {}
}

export class Rolling extends State {
  constructor(game: Game) {
    super('RUNNING', game)
  }
  enter() {}
  handleInput(_input: string[]) {}
}
export class Jumping extends State {
  constructor(game: Game) {
    super('JUMPING', game)
  }
  enter() {}
  handleInput(_input: string[]) {}
}
export class Falling extends State {
  constructor(game: Game) {
    super('FALLING', game)
  }
  enter() {}
  handleInput(_input: string[]) {}
}
export class Diving extends State {
  constructor(game: Game) {
    super('DIVING', game)
  }
  enter() {}
  handleInput(_input: string[]) {}
}

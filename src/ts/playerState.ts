import { Game } from './main'

enum states {
  STANDING = 0,
  RUNNING = 1,
  JUMPING = 2,
  FALLING = 3,
  DIVING = 4,
}

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
    this.game.player.maxFrame = 0
    this.game.player.frameY = 5.5
  }

  handleInput(input: string[]) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1)
    } else if (input.includes('Enter')) {
      //
    }
  }
}

export class Running extends State {
  constructor(game: Game) {
    super('RUNNING', game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 3
    this.game.player.frameY = 5.5
  }

  handleInput(input: string[]) {
    if (
      input.includes('ArrowDown') &&
      !input.includes('ArrowLeft') &&
      !input.includes('ArrowRight')
    ) {
      this.game.player.setState(states.STANDING, 0)
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1)
    } else if (input.includes('Enter')) {
      //
    } else if (!input.length) {
      this.game.player.setState(states.STANDING, 0)
    }
  }
}

export class Jumping extends State {
  constructor(game: Game) {
    super('JUMPING', game)
  }
  enter() {
    if (this.game.player.isOnGround()) this.game.player.vy -= 20
    this.game.player.frameX = 5
    this.game.player.maxFrame = 0
    this.game.player.frameY = 5.5
  }

  handleInput(input: string[]) {
    if (
      this.game.player.vy > this.game.player.weight ||
      !this.game.input.keys.includes('ArrowUp')
    ) {
      this.game.player.setState(states.FALLING, 5)
    } else if (input.includes('Enter')) {
      //
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0)
    }
  }
}

export class Falling extends State {
  constructor(game: Game) {
    super('FALLING', game)
  }
  enter() {
    this.game.player.frameX = 5
    this.game.player.maxFrame = 0
    this.game.player.frameY = 5.5
  }

  handleInput(input: string[]) {
    if (this.game.player.isOnGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0)
    }
  }
}

export class Diving extends State {
  constructor(game: Game) {
    super('DIVING', game)
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 0
    this.game.player.frameY = 5.5
    // this.game.player.vy = 15
  }

  handleInput(input: string[]) {
    if (this.game.player.isOnGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (input.includes('Enter') && this.game.player.isOnGround()) {
      //
    }
  }
}

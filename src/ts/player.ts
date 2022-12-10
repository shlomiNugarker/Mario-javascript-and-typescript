import { Game } from './main'
import { Diving, Falling, Jumping, Running, Standing } from './playerState'

export class Player {
  game: Game
  width: number
  height: number
  x: number
  y: number
  vy: number
  image: HTMLImageElement
  frameX: number
  frameY: number
  maxFrame: number
  fps: number
  frameInterval: number
  frameTimer: number

  states: any[]
  currentState: Diving | Falling | Jumping | Running | Standing
  weight: number
  speed: number
  maxSpeed: number

  constructor(game: Game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.x = 0
    this.y = this.game.height - this.height * 2
    this.vy = 0 // vertical y
    this.weight = 1
    this.speed = 0
    this.maxSpeed = 9
    this.image = document.getElementById('sprite') as HTMLImageElement

    this.frameX = 0 // frames to choose player sprite img
    this.frameY = 5.5
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.states = [
      new Standing(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Diving(this.game),
    ]

    this.currentState = this.states[0]
  }

  update(input: string[], deltaTime: number) {
    this.currentState.handleInput(input)
    this.handleInputToAllStates(input)

    // ***************************************************************************************
    // handle pipe with player
    if (
      this.game.input.keys.includes('ArrowRight') &&
      this.game.background.pipe.x - (this.game.background.pipe.width / 2) * 4 <
        this.x &&
      this.y + this.height > this.game.background.pipe.y
    ) {
    }
    //
    else this.x += this.speed

    // ***********************************************************************************************

    // horizontal boundaries
    if (this.x < 0) this.x = 0

    const isPlayerInTheMiddle = this.x > this.game.width / 2
    if (isPlayerInTheMiddle) this.x = this.game.width / 2

    // vertical boundaries
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height
    }

    this.y += this.vy
    if (!this.isOnGround()) this.vy += this.weight
    else this.vy = 0

    // vertical boundaries
    if (this.y > this.game.height - this.height)
      this.y = this.game.height - this.height

    this.handleSpriteAnimation(deltaTime)

    // console.log('player x:', this.x)

    // console.log('pipe x:', this.game.background.pipe.x)
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * 2,
      this.height * 2
    )
  }

  isOnGround() {
    return this.y >= this.game.height - this.height * 2
  }

  handleSpriteAnimation(deltaTime: number) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else {
        if (this.currentState instanceof Jumping) this.frameX = 5
        else if (this.currentState instanceof Falling) this.frameX = 5
        else this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }

  handleInputToAllStates(input: string[]) {
    if (input.includes('ArrowRight') && this.currentState !== this.states[4]) {
      this.speed = this.maxSpeed
      const isPlayerInTheMiddle = this.x > this.game.width / 2
      if (isPlayerInTheMiddle) this.game.screenX -= this.maxSpeed
    } else if (
      input.includes('ArrowLeft') &&
      this.currentState !== this.states[4]
    ) {
      if (this.game.screenX >= 0) this.game.screenX = 0
      this.speed = -this.maxSpeed
      // this.game.screenX += this.maxSpeed // player can go back
    } else this.speed = 0
  }

  setState(stateNum: 0 | 1 | 2 | 3 | 4, _speed: number) {
    this.currentState = this.states[stateNum]
    this.currentState.enter()
  }
}

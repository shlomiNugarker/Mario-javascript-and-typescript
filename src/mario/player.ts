import { Game } from '../main'
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
  speed: number
  maxSpeed: number
  states: any[]
  currentState: any | undefined
  weight: number

  constructor(game: Game) {
    this.game = game
    this.width = 16 // & height of the player Depends on the sprite img
    this.height = 16
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.vy = 0 // vertical y
    this.weight = 1
    this.image = document.getElementById('sprite') as HTMLImageElement

    this.frameX = 0 // frames to choose player sprite img
    this.frameY = 0
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.speed = 0
    this.maxSpeed = 4

    this.states = [
      new Standing(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Diving(this.game),
    ]
  }

  update(input: string[], deltaTime: number) {
    if (this.currentState) this.currentState.handleInput(input)
    this.x += this.speed
    // handle input also here for moving with all states
    if (input.includes('ArrowRight') && this.currentState !== this.states[4])
      this.speed = this.maxSpeed
    else if (
      input.includes('ArrowLeft') &&
      this.currentState !== this.states[4]
    )
      this.speed = -this.maxSpeed
    //
    else this.speed = 0
    // horizontal boundaries
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width
    // vertical movement
    this.y += this.vy
    if (!this.onGround()) this.vy += this.weight
    else this.vy = 0
    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin

    // sprite animation:
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else {
        if (this.currentState === this.states[2]) this.frameX = 5
        else if (this.currentState === this.states[3]) this.frameX = 5
        else this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context: CanvasRenderingContext2D) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height)

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
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }
  setState(state: number, speed: number) {
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    if (this.currentState) this.currentState.enter()
  }
}

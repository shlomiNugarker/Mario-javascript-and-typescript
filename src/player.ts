import { Game } from './main'

export class Player {
  game: Game
  width: number
  height: number
  x: number
  y: number
  image: HTMLImageElement | undefined
  speed: number
  maxSpeed: number
  vy: number
  weight: number
  states: any[]
  currentState: undefined
  frameX: number
  frameY: number
  maxFrame: number
  fps: number
  frameInterval: number
  frameTimer: number
  gameSpeed: number | undefined

  constructor(game: Game) {
    this.game = game
    this.width = 223.5
    this.height = 447
    this.x = 0
    // this.y = this.game.height - this.height - this.game.groundMargin
    this.y = this.game.height - this.height / 5 - this.game.groundMargin
    this.vy = 0 // vertical y
    this.weight = 1
    this.image = document.getElementById('player') as
      | HTMLImageElement
      | undefined

    this.frameX = 0 // frames to choose player sprite img
    this.frameY = 0
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.speed = 0
    this.maxSpeed = 4

    this.states = []
  }

  update(_input: string[], _deltaTime: number) {}
  draw(context: CanvasRenderingContext2D) {
    if (this.image)
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width, // size of the player
        this.height
      )
  }
}

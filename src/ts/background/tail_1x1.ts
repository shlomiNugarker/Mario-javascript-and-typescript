import { Game } from '../main'

export class Tail_1x1 {
  game: Game
  height: number
  width: number
  speedModifier: number
  image: HTMLImageElement
  x: number
  y: number
  frameX: number
  frameY: number
  maxFrame: number

  constructor(
    game: Game,
    width: number,
    height: number,
    speedModifier: number,
    image: HTMLImageElement,
    frameX: number,
    frameY: number,
    x = 0,
    y = 0,
    maxFrame = 0
  ) {
    this.game = game
    this.width = width
    this.height = height
    this.speedModifier = speedModifier
    this.image = image
    this.x = x
    this.y = y

    this.frameX = frameX
    this.frameY = frameY
    this.maxFrame = maxFrame
  }

  update() {}

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x + this.game.screenX,
      this.y,
      this.width,
      this.height
    )
  }
}

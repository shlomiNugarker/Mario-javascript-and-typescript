import { Game } from '../main'

export class Sky {
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

    this.frameX = frameX // frames to choose from sprite img
    this.frameY = frameY
    this.maxFrame = maxFrame
  }

  update() {
    // always draw in the same position
  }
  draw(context: CanvasRenderingContext2D) {
    const widthPxl = this.game.width / this.width
    const heightPxl = this.game.height / this.height

    for (let i = 0; i < widthPxl; i++) {
      for (let j = 0; j < heightPxl; j++) {
        context.drawImage(
          this.image,
          this.frameX * this.width,
          this.frameY * this.height,
          this.width,
          this.height,
          this.x + i * this.width,
          this.y + j * this.height,
          this.width,
          this.height
        )
      }
    }
  }
}

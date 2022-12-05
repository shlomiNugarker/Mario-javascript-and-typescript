import { Game } from './main'

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
    if (this.x < -this.width) this.x = 0
    else this.x -= this.game.speed * this.speedModifier
  }
  draw(context: CanvasRenderingContext2D) {
    // draw the image twice for endless moving ?
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

export class Background {
  game: Game
  width: number
  height: number
  tiles: HTMLImageElement
  backgroundLayers: Sky[]
  sky: Sky

  constructor(game: Game) {
    this.game = game
    this.width = 1667
    this.height = 500

    this.tiles = document.getElementById('tiles') as HTMLImageElement

    this.sky = new Sky(this.game, 16, 16, 0, this.tiles, 9, 7)

    this.backgroundLayers = [this.sky]
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update()
    })
  }
  draw(context: CanvasRenderingContext2D) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context)
    })
  }
}

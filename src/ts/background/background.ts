import { Game } from '../main'
// import { Cloud } from './cloud'
import { Sky } from './sky'

export class Background {
  game: Game
  tiles: HTMLImageElement
  backgroundLayers: Sky[]
  sky: Sky
  // cloud: Cloud

  constructor(game: Game) {
    this.game = game
    this.tiles = document.getElementById('tiles') as HTMLImageElement
    this.sky = new Sky(this.game, 16, 16, 0, this.tiles, 10, 7) // light blue sky
    // this.cloud = new Cloud(this.game, 16, 16, 0, this.tiles, 11, 8) // light blue sky
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

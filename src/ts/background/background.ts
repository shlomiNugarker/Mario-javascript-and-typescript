import { Game } from '../main'
import { Tail_1x1 } from './tail_1x1'
import { Cloud } from './cloud'

import { Pipe } from './pipe'
import { Sky } from './sky'
import { Tail_3x2 } from './tail_3x2'
import { Tail_2x2 } from './tail_2x2'
import { Tail_2x1 } from './tail_2x1'
import { Tail_3x1 } from './tail_3x1'
import { Tail_1x3 } from './tail_1x3'

export class Background {
  game: Game
  tiles: HTMLImageElement
  backgroundLayers: Sky[]
  sky: Sky
  cloud: Cloud
  pipe: Pipe
  floor: Tail_1x1
  topWall: Tail_2x1
  hoverFloor: Tail_3x1
  pole: Tail_1x3

  constructor(game: Game) {
    this.game = game
    this.tiles = document.getElementById('tiles') as HTMLImageElement
    this.sky = new Sky(this.game, 16, 16, 0, this.tiles, 10, 7) // light blue sky

    this.cloud = new Tail_3x2(this.game, 16, 16, 0, this.tiles, 11, 8, 450, 100)
    this.floor = new Tail_1x1(this.game, 16, 16, 0, this.tiles, 0, 0, 700)
    this.pole = new Tail_1x3(this.game, 16, 16, 0, this.tiles, 14, 3, 400)
    this.topWall = new Tail_2x1(this.game, 16, 16, 0, this.tiles, 8, 0, 110)
    this.hoverFloor = new Tail_3x1(this.game, 16, 16, 0, this.tiles, 9, 2, 610)
    this.pipe = new Tail_2x2(
      this.game,
      16,
      16,
      0,
      this.tiles,
      0,
      3,
      290,
      this.game.height - 64
    )

    this.backgroundLayers = [
      this.sky,
      this.cloud,
      this.floor,
      this.pole,
      this.topWall,
      this.hoverFloor,
      this.pipe,
    ]
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

import { Player } from './player'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 900
canvas.height = 500

export class Game {
  width: number
  height: number
  groundMargin: number
  player: Player

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 20
    this.player = new Player(this)
  }

  update(_deltaTime: number) {}

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context)
  }
  addEnemy() {}
}

const game = new Game(canvas.width, canvas.height)
let lastTime = 0

function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate(0)

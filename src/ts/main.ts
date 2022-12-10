import { Background } from './background/background'
import { InputHandler } from './input'
import { Player } from './player'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 900
canvas.height = 500

export class Game {
  width: number
  height: number
  time: number
  player: Player
  input: InputHandler
  speed: number
  background: Background
  screenX: number
  screenY: number
  groundMargin: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.time = 0
    this.groundMargin = 16

    this.speed = 0

    this.background = new Background(this)
    this.player = new Player(this)
    this.input = new InputHandler(this)

    this.screenX = 0
    this.screenY = 0

    // this.player.currentState.enter()
  }

  update(deltaTime: number) {
    this.time += deltaTime
    this.background.update()
    this.player.update(this.input.keys, deltaTime)
  }

  draw(context: CanvasRenderingContext2D) {
    this.background.draw(context)
    this.player.draw(context)
  }
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

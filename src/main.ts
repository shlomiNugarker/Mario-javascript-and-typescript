import { Background } from './background'
import { InputHandler } from './input'
import { Player } from './mario/player'
import { UI } from './UI'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 700
canvas.height = 500

export class Game {
  width: number
  height: number
  groundMargin: number
  speed: number
  maxSpeed: number
  debug: boolean
  input: InputHandler
  enemies: any[]
  enemyTimer: number
  enemyInterval: number
  score: number
  time: number
  maxTime: number
  gameOver: boolean
  fontColor: string
  player: Player
  UI: UI
  background: any

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 40
    this.speed = 0
    this.maxSpeed = 3
    this.player = new Player(this)
    this.background = new Background(this)
    this.input = new InputHandler(this)
    this.UI = new UI(this)
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.debug = false
    this.score = 0
    this.fontColor = 'black'
    this.time = 0
    this.maxTime = 2000
    this.gameOver = false
    this.player.currentState = this.player.states[3]
    this.player.currentState.enter()
  }

  update(deltaTime: number) {
    this.time += deltaTime
    if (this.time > this.maxTime) this.gameOver = true
    this.background.update()
    this.player.update(this.input.keys, deltaTime)
    // handleEnemies ?
  }
  draw(context: CanvasRenderingContext2D) {
    this.background.draw(context)
    this.player.draw(context)
    this.UI.draw(context)
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

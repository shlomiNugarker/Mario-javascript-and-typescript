import { Game } from './main'

export class UI {
  game: Game
  fontFamily: string
  fontSize: number

  constructor(game: Game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(context: CanvasRenderingContext2D) {
    context.save()

    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'white'
    context.shadowBlur = 0

    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    // score
    context.fillText('Score: ' + this.game.score, 20, 50)
    // timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80)
    // game over massage
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily
      if (this.game.score > 5) {
        context.fillText(
          'Nice work !',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText(
          ':)',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
      } else {
        context.fillText(
          'GAME OVER? ',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText(
          'Maybe next time ?! ',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
      }
    }
    context.restore()
  }
}

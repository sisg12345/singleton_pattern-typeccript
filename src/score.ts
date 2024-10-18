import type { Scoreable } from './interfaces.js'
import { Foods } from './foods.js'

/**
 * シングルトンパターン対応
 */
export class Score implements Scoreable {
  // インスタンス
  private static instance: Score

  // トータルスコア
  get totalScore() {
    const foods = Foods.getInstance()

    return foods.activeElementsScore.reduce((total, score) => total + score, 0)
  }

  private constructor() {}

  /**
   * スコアをDOMにレンダリングする
   */
  render() {
    document.querySelector('.score__number')!.textContent = String(
      this.totalScore
    )
  }

  static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score()
    }

    return Score.instance
  }
}

import type { Foodable } from './interfaces.js'
import { Score } from './score.js'

export class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    element.addEventListener('click', this.clickEventHandler.bind(this))
  }

  /**
   * クリックイベントハンドラー
   */
  clickEventHandler() {
    // クラスの追加削除
    this.element.classList.toggle('food--active')

    // インスタンス取得
    const score = Score.getInstance()
    // スコアをDOMにレンダリングする
    score.render()
  }
}

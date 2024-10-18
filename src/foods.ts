import type { Foodsable } from './interfaces.js'
import { Food } from './food.js'

/**
 * シングルトンパターン対応
 */
export class Foods implements Foodsable {
  // インスタンス
  private static instance: Foods
  // 要素一覧
  elements = document.querySelectorAll<HTMLDivElement>('.food')
  // 活性化要素一覧
  private _activeElements: HTMLDivElement[] = []
  // スコア一覧
  private _activeElementsScore: number[] = []

  get activeElements() {
    // 活性化要素を初期化
    this._activeElements = []
    // 活性化要素を取得
    this.elements.forEach((element) => {
      if (element.classList.contains('food--active')) {
        this._activeElements.push(element)
      }
    })

    return this._activeElements
  }

  get activeElementsScore() {
    // スコアを初期化
    this._activeElementsScore = []
    // スコアを取得
    this.activeElements.forEach((element) => {
      const foodScore = element.querySelector('.food__score')
      if (foodScore) {
        this._activeElementsScore.push(Number(foodScore.textContent))
      }
    })

    return this._activeElementsScore
  }

  private constructor() {
    this.elements.forEach((element) => {
      new Food(element)
    })
  }

  /**
   * インスタンス取得
   * @returns インスタンス
   */
  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods()
    }

    return Foods.instance
  }
}

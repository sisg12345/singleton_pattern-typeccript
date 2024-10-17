interface Scoreable {
  readonly totalScore: number
  render(): void
}
interface Foodable {
  element: HTMLDivElement
  clickEventHandler(): void
}
interface Foodsable {
  elements: NodeListOf<HTMLDivElement>
  readonly activeElements: HTMLDivElement[]
  readonly activeElementsScore: number[]
}

/**
 * シングルトンパターン対応
 */
class Score implements Scoreable {
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

class Food implements Foodable {
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

/**
 * シングルトンパターン対応
 */
class Foods implements Foodsable {
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

const foods = Foods.getInstance()

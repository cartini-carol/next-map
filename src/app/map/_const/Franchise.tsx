/**
 * 매장 유형
 */
export enum Franchise {
  /**
   * @type SM
   * @value 스피드메이트
   */
  SM = "스피드메이트",
  /**
   * @type GS
   * @value GS엠비즈
   */
  GS = "GS엠비즈",
  /**
   * @type ETC
   * @value 기타
   */
  ETC = "기타",
}

export type FranchiseType = keyof typeof Franchise;

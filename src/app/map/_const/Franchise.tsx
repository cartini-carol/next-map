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

  /**
   * @type TF
   * @value 타이어플라이
   */
  TF = "타이어플라이",
}

export type FranchiseType = keyof typeof Franchise;

export const franchiseColor: { [k: string]: string } = {
  SM: "bg-red-300",
  GS: "bg-orange-300",
  TF: "bg-green-300",
  ETC: "bg-gray-300",
};

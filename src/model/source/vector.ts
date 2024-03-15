import { BoundaryType } from "./type";

/**
 * 벡터정보
 */
export interface VectorSourceInfo {
  /**
   * ID
   */
  id?: number;
  /**
   * 영역정보
   * 이미지 우상단 0,0 기준
   */
  boundary?: BoundaryType;
  /**
   * 추가 속성
   */
  properties?: any;
}

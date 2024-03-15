/**
 * 이미지 정보
 */
export interface ImageSourceInfo {
  /**
   * ID
   */
  id?: number;
  /**
   * 이미지 blob
   */
  blob: File;
  /**
   * 추가 속성
   */
  properties?: any;
}

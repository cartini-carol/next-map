export interface LayerInfo {
  /**
   * ID
   */
  id?: number;
  /**
   * 레이어명
   */
  name?: string;
  /**
   * 순서
   */
  index?: number;
  /**
   * 소스ID
   */
  sourceId?: number;
  /**
   * 소스유형
   */
  sourceType?: "Image" | "Vector";
}

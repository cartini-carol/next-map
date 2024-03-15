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
  /**
   * @mappin LayerInfo.id
   * - Vector는 image layer id 연결
   */
  parentId?: number;
  /**
   * 생성일시
   */
  createdAt?: Date;
  /**
   * 수정일시
   */
  updatedAt?: Date;
}

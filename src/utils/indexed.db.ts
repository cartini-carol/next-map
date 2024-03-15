import Dexie, { Table } from "dexie";
import { ImageSourceInfo, LayerInfo, VectorSourceInfo } from "model";

export class LightClassDexie extends Dexie {
  layers!: Table<LayerInfo>;
  vectors!: Table<VectorSourceInfo>;
  images!: Table<ImageSourceInfo>;

  constructor() {
    super("canvasDB");
    this.version(1).stores({
      layers: "++id, sourceId",
      vectors: "++id",
      images: "++id",
    });
    this.version(1.1).stores({
      layers: "++id, sourceId",
      vectors: "++id",
      images: "++id",
    });
    this.version(1.2).stores({
      layers: "++id, sourceId, sourceType",
      vectors: "++id",
      images: "++id",
    });
  }
}

export const lightDB = new LightClassDexie();

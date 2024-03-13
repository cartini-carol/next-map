import Dexie, { Table } from "dexie";
import { ImageSourceInfo, LayerInfo, VectorSourceInfo } from "model";

export class LightClassDexie extends Dexie {
  layers!: Table<LayerInfo>;
  vectors!: Table<VectorSourceInfo>;
  images!: Table<ImageSourceInfo>;

  constructor() {
    super("canvaDatabase");
    this.version(1).stores({
      layers: "++id, sourceId",
      vectors: "++id",
      images: "++id",
    });
  }
}

export const lightDB = new LightClassDexie();

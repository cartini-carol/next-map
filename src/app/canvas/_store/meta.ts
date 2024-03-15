import { create } from "zustand";

interface ImageMetaProps {
  w?: number | null;
  h?: number | null;
  size?: number | null;
  name?: string | null;
  type?: string | null;
  /**
   * devicePixelRatio
   */
  dpr?: number;
  /**
   * dx - canvas
   */
  dx?: number;
  /**
   * dy - canvas
   */
  dy?: number;
  /**
   * scale
   */
  scale?: number;
}

interface ImageMetaStore {
  meta: ImageMetaProps;
  setMeta: (state: ImageMetaProps) => void;
}

export const useImageMetaStore = create<ImageMetaStore>((set) => ({
  meta: { w: null, h: null, size: null, name: null, type: null },
  setMeta: (state: ImageMetaProps) => set(() => ({ meta: state })),
}));

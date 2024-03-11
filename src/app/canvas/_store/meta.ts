import { create } from "zustand";

interface ImageMetaProps {
  w: number | null;
  h: number | null;
  size: number | null;
  name: string | null;
  type: string | null;
}

interface ImageMetaStore {
  meta: ImageMetaProps;
  setMeta: (state: ImageMetaProps) => void;
}

export const useImageMetaStore = create<ImageMetaStore>((set) => ({
  meta: { w: null, h: null, size: null, name: null, type: null },
  setMeta: (state: ImageMetaProps) => set(() => ({ meta: state })),
}));

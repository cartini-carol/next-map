import { create } from "zustand";

interface LayerStore {
  id: number | undefined;
  setId: (select: number | undefined) => void;
}

export const useLayerStore = create<LayerStore>((set) => ({
  id: undefined,
  setId: (select: number | undefined) => set(() => ({ id: select })),
}));

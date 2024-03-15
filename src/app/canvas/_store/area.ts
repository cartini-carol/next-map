import { create } from "zustand";

interface MapAreaProps {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MapAreaStore {
  area: Array<MapAreaProps> | undefined;
  addArea: (select: MapAreaProps) => void;
  removeArea: () => void;
}

export const useMapAreaStore = create<MapAreaStore>((set) => ({
  area: undefined,
  addArea: (select: MapAreaProps) =>
    set((state) => ({
      area: state.area?.length ? [...state.area, select] : [select],
    })),
  removeArea: () => set(() => ({ area: undefined })),
}));

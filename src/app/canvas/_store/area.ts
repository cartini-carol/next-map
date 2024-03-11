import { create } from "zustand";

interface MapAreaProps {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MapAreaStore {
  area: MapAreaProps | undefined;
  addArea: (select: MapAreaProps) => void;
}

export const useMapAreaStore = create<MapAreaStore>((set) => ({
  area: undefined,
  addArea: (select: MapAreaProps) => set((state) => ({ area: select })),
}));

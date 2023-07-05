import { Map } from "ol";
import { create } from "zustand";

/**
 * mapStore
 */
export const useMapStore = create((set) => ({
  map: null,
  populateMap: (mapGenerated: Map) => set(() => ({ map: mapGenerated })),
  removeMap: () => set({ map: null }),
}));

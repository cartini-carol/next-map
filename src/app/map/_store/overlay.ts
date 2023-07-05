import { Map, Overlay } from "ol";
import { create } from "zustand";

/**
 * mapStore
 */
export const useOverlayStore = create((set) => ({
  overlay: null,
  populateOverlay: (overlayGenerated: Overlay) =>
    set(() => ({ overlay: overlayGenerated })),
  removeOverlay: () => set({ overlay: null }),
}));

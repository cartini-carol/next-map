"use client";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import { useEffect, useRef } from "react";
import {
  MousePosition,
  ScaleLine,
  ZoomSlider,
  defaults as defaultControls,
} from "ol/control";
import { createStringXY } from "ol/coordinate";
import { useMapStore } from "./_store/map";

export const Maps = () => {
  const setMap = useMapStore((state: any) => state.populateMap);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const map = new Map({
        target: ref.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([128, 36]),
          zoom: 7,
          projection: "EPSG:3857",
        }),
        controls: defaultControls().extend([
          new ScaleLine({
            units: "metric",
          }),
          new ZoomSlider({
            duration: 1000,
          }),
          new MousePosition({
            coordinateFormat: createStringXY(6),
            projection: "EPSG:4326",
          }),
        ]),
      });

      setMap(map);
    }
  }, [ref, setMap]);

  return (
    <div className="absolute w-screen h-screen">
      <div ref={ref} className="absolute w-full h-full" />
    </div>
  );
};

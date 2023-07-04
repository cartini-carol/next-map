"use client";

import { Feature, Map, MapBrowserEvent, View } from "ol";
import {
  MousePosition,
  ScaleLine,
  ZoomSlider,
  defaults as defaultControls,
} from "ol/control";
import { createStringXY } from "ol/coordinate";
import WKT from "ol/format/WKT";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import ClusterSource from "ol/source/Cluster";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { StyleLike } from "ol/style/Style";
import { FunctionComponent, useEffect, useRef } from "react";
import { useMapStore } from "../_store/map";

export const Maps: FunctionComponent<{ data: any }> = ({ data }) => {
  const map: Map = useMapStore((state: any) => state.map);
  const setMap = useMapStore((state: any) => state.populateMap);
  const ref = useRef(null);

  /**
   * cluster source style
   * @param feature
   */
  const clusterStyleFunction: StyleLike = (feature, resolution) => {
    const size = feature.get("features").length;
    const count = feature.get("features")[0].get("count");

    return new Style({
      image: new Circle({
        radius: (400 * size) / resolution,
        fill: new Fill({
          color: [255, 0, 0, Math.min(0.8, 0.4 + size / count)],
        }),
      }),
      text: new Text({
        fill: new Fill({
          color: "white",
        }),
        stroke: new Stroke({
          width: 1,
          color: "black",
        }),
        text: `${size}`,
        scale: 1.1,
      }),
    });
  };

  useEffect(() => {
    if (map && data) {
      const isLayers = map
        .getAllLayers()
        .find((layer: Layer) => layer.get("name") === "repairShop");
      if (isLayers) {
        map.removeLayer(isLayers);
      }
      const format = new WKT();
      const features = data.map((item: any) => {
        const { lat, lng, ...info } = item;
        const wkt = `POINT(${lng} ${lat})`;
        const feature = format.readFeature(wkt, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });

        feature.setProperties({ ...info, count: data.length });

        return feature;
      });

      const layer = new VectorLayer({
        source: new ClusterSource({
          distance: 40,
          source: new VectorSource({
            features,
          }),
        }),
        style: clusterStyleFunction,
      });

      layer.set("name", "repairShop");
      map.addLayer(layer);
    }
  }, [map, data]);

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

  useEffect(() => {
    if (map) {
      map.on("pointermove", (e: MapBrowserEvent<any>) => {
        if (map) {
          map.forEachFeatureAtPixel(e.pixel, (f) => {
            const features = f.get("features");

            const statics = features.reduce((a: any, b: Feature) => {
              const type = b.get("repairShopFranchiseType");
              if (!a[b.get("repairShopFranchiseType")]) {
                a[type] = 0;
              }

              a[type] += 1;

              return a;
            }, {});

            console.log(statics);
          });
        }
      });
    }
  }, [map]);

  return (
    <div className="absolute w-screen h-screen">
      <div ref={ref} className="absolute w-full h-full" />
    </div>
  );
};

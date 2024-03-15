"use client";

import { useDraw } from "hooks/useDraw";
import { PositionType } from "model/source/type";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useMapAreaStore } from "../_store/area";
import { useImageMetaStore } from "../_store/meta";
import { GuideLine } from "./interaction/guideLine";
import { CanvasPosition } from "./interaction/position";
import { SpyView } from "./interaction/spyView";

export const Canvas: FunctionComponent = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const meta = useImageMetaStore((state) => state.meta);
  const { addArea } = useMapAreaStore();
  const pos = useDraw();

  const position = useState<PositionType | undefined>();
  /**
   * vector 저장
   * @param recPos
   */
  // const saveRect = async (recPos: RectPos) => {
  //   if (Object.values(recPos).fill((i: any) => i).length) {
  //     try {
  //       const ids: number[] = [];
  //       await lightDB.vectors.each((data) => ids.push(data.id as number));
  //       const layers = lightDB.layers.filter(
  //         (data) =>
  //           data.sourceType === "Vector" &&
  //           ids.includes(data.sourceId as number)
  //       );
  //       lightDB.vectors.bulkDelete(ids);
  //       layers.delete();

  //       const sourceId = await lightDB.vectors.add({
  //         boundary: [
  //           [recPos.x, recPos.y],
  //           [recPos.w + recPos.x, recPos.h + recPos.y],
  //         ],
  //         properties: {
  //           type: "rect",
  //         },
  //       });

  //       const layerId = await lightDB.layers.add({
  //         name: "button1",
  //         sourceType: "Vector",
  //         sourceId: sourceId as number,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const handleCurrentPosition = (pos: PositionType | undefined) => {};

  useEffect(() => {
    if (pos?.length === 2) {
      const canvas = ref.current as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      const dx = meta?.dx || 0;
      const dy = meta?.dy || 0;

      const [start, end] = pos;

      const x = start[0];
      const y = start[1];
      const w = end[0] - start[0];
      const h = end[1] - start[1];

      ctx?.beginPath();
      ctx?.strokeRect(x, y, w, h);
      // saveRect(rect);
      addArea({ x: Math.floor(x - dx), y: Math.floor(y - dy), w, h });
    }
  }, [pos, ref, addArea, meta]);

  return (
    <div className="relative w-full h-full">
      <canvas
        id="canvas"
        width="1000"
        height="1000"
        className="absolute w-full h-full"
        ref={ref}
      />
      <CanvasPosition onChange={handleCurrentPosition} />
      <GuideLine />
      {meta?.name && position?.length && <SpyView />}
    </div>
  );
};

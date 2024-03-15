"use client";

import { useMapAreaStore } from "app/canvas/_store/area";
import { ImageSourceInfo } from "model";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { lightDB } from "utils/indexed.db";

interface PreviewFormProps {
  id: number;
}

export const PreviewForm: FunctionComponent<PreviewFormProps> = ({ id }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [img, setImg] = useState<ImageSourceInfo>();
  const area = useMapAreaStore((state) => state.area);
  // const { w, scale, dx, dy } = useImageMetaStore((state) => state.meta);

  useEffect(() => {
    lightDB
      .transaction("r", [lightDB.layers, lightDB.images], async () => {
        const layer = await lightDB.layers
          .where({ id, sourceType: "Image" })
          .first();
        let img;
        if (layer?.sourceId) {
          img = await lightDB.images.get(+layer.sourceId);
        }
        return img;
      })
      .then((res) => {
        setImg(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (img && !!ref.current) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        (ref.current as HTMLImageElement).src = e.target!.result!.toString();
      });

      reader.readAsDataURL(img?.blob);
    }
  }, [img, ref]);

  const meta = {
    w: 1600,
    h: 11358,
    name: "Frame 427318849.png",
    size: 1166095,
    type: "image/png",
    dx: 1176.1465927099841,
    dy: 0,
    scale: 0.2091917591125198,
  };
  const ratio = 1600 / 800;

  return (
    <div className="max-w-[800px] m-auto">
      <img
        ref={ref}
        useMap={img ? `#img_${img.id}` : undefined}
        className="w-full h-auto"
      />
      {img && meta && (
        <map name={`#img_${img.id}`}>
          {[{ x: 1200, y: 596, w: 284, h: 100 }].map((item) => (
            <area
              key={`#img_${img.id}_${Object.values(item).join(":")}`}
              shape="rect"
              coords={[
                (item.x - meta.dx) / meta.scale / ratio,
                (item.y - meta.dy) / meta.scale / ratio,
                (item.w + item.x - meta.dx) / meta.scale / ratio,
                (item.h + item.y - meta.dy) / meta.scale / ratio,
              ].join(",")}
              href="https://www.tire-pick.com"
              target="_black"
            />
          ))}
        </map>
      )}
    </div>
  );
};

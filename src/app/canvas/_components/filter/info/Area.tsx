import { useMapAreaStore } from "app/canvas/_store/area";
import { useImageMetaStore } from "app/canvas/_store/meta";
import React, { useEffect, useId } from "react";
import { InfoItem } from "./item";

export const InfoArea = () => {
  const id = useId();
  const meta = useImageMetaStore((state) => state.meta);
  const area = useMapAreaStore((state) => state.area);

  useEffect(() => {
    console.log(meta);
  }, [meta]);

  return (
    <>
      {area?.map((value, idx, arr) => (
        <React.Fragment key={`${id}${idx}`}>
          <InfoItem label="left" value={value.x} />
          <InfoItem label="top" value={value.y} />
          <InfoItem label="right" value={value.w + value.x} />
          <InfoItem label="bottom" value={value.h + value.y} />
          {arr.length - 1 !== idx && (
            <hr className="border-gray-700 mt-1 mb-1 border-dashed" />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

import { useMapStore } from "app/map/_store/map";
import { useOverlayStore } from "app/map/_store/overlay";
import { Overlay } from "ol";
import { FunctionComponent, useEffect, useRef } from "react";

interface StatisticsOverlayProps {
  info: any;
}

export const StatisticsOverlay: FunctionComponent<StatisticsOverlayProps> = ({
  info,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const setOverlay = useOverlayStore((state: any) => state.populateOverlay);

  useEffect(() => {
    if (ref.current) {
      const overlay = new Overlay({
        element: ref.current,
        autoPan: {
          animation: {
            duration: 500,
          },
        },
      });
      overlay.set("name", "statistics");
      setOverlay(overlay);
    }
  }, [setOverlay]);

  return (
    <div
      ref={ref}
      className="absolute bg-white shadow-current text-black px-1 w-48 rounded-sm"
    >
      <div>스피트 메이트 : {info?.SM}</div>
      <div>GS 엠비즈 : {info?.GS}</div>
      <div>기타 : {info?.ETC}</div>
    </div>
  );
};

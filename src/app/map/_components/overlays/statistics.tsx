import { Franchise, FranchiseType } from "app/map/_const/Franchise";
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
        offset: [15, 15],
      });
      overlay.set("name", "statistics");
      setOverlay(overlay);
    }
  }, []);

  return (
    <section
      ref={ref}
      className="absolute bg-white shadow-current text-black px-3 py-3 w-48 rounded-sm"
    >
      {Object.entries(Franchise).map(([k, v]) => (
        <div key={k} className="flex">
          <span className="text-stone-800 flex-[2_2_0%]">{v}</span>
          <span className="font-semibold flex-none text-right">
            {info ? info[k as FranchiseType] : 0 || 0}
          </span>
        </div>
      ))}
    </section>
  );
};

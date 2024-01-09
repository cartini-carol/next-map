"use client";

import { franchiseColor } from "app/map/_const/Franchise";
import { Feature } from "ol";
import { useEffect, useId } from "react";

interface MapRepairShopListProps {
  features: Array<Feature>;
}

export const MapRepairShopList: React.FC<MapRepairShopListProps> = ({
  features,
}) => {
  const id = useId();

  useEffect(() => {
    console.log(features);
  }, [features]);

  return (
    <>
      {features.length && (
        <div className="absolute fixe w-1/4 right-0 top-0 h-full z-10 bg-white shadow-2xl text-gray-900 px-3 py-2 overflow-auto">
          {/* 필터 */}

          {features.map((feature) => (
            <details key={`${id}${feature.get("id")}`}>
              <summary>
                <span
                  className={`${
                    franchiseColor[feature.get("repairShopFranchiseType")]
                  } `}
                >
                  {feature.get("repairShopFranchiseType")}
                </span>

                {feature.get("displayName")}
              </summary>
            </details>
          ))}
          {/* 통계 */}
        </div>
      )}
    </>
  );
};

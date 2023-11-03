"use client";

import { franchiseColor } from "app/map/_const/Franchise";
import { Feature } from "ol";
import { useEffect } from "react";

interface MapRepairShopListProps {
  features: Array<Feature>;
}

export const MapRepairShopList: React.FC<MapRepairShopListProps> = ({
  features,
}) => {
  useEffect(() => {
    console.log(features);
  }, [features]);

  return (
    <>
      {features.length && (
        <div className="fixe w-1/4 right-0 top-0 h-full z-10 bg-white shadow-2xl text-gray-900 px-3 py-2 overflow-auto">
          {features.map((feature) => (
            <details key={feature.get("id")}>
              <summary>
                <span
                  className={`${
                    franchiseColor[feature.get("repairShopFranchiseType")]
                  }`}
                >
                  {feature.get("repairShopFranchiseType")}
                </span>

                {feature.get("displayName")}
              </summary>
            </details>
          ))}
        </div>
      )}
    </>
  );
};

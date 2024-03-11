"use client";

import { FunctionComponent } from "react";

interface InfoItemPrope {
  label: React.ReactNode;
  value: React.ReactNode;
}
export const InfoItem: FunctionComponent<InfoItemPrope> = ({
  label,
  value,
}) => {
  return (
    <>
      {value && (
        <div className="inline-flex gap-1 cursor-default">
          <span className="flex-none w-[62px]">{label}</span>
          <span className="flex-auto break-all text-right">{value}</span>
        </div>
      )}
    </>
  );
};

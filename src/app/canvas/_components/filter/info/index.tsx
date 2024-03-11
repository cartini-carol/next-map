"use client";

import { useImageMetaStore } from "app/canvas/_store/meta";
import { formatBytes } from "app/canvas/_utils/convert";
import { FunctionComponent } from "react";
import { InfoItem } from "./item";

interface FileInfoProps {}

export const FileInfo: FunctionComponent<FileInfoProps> = () => {
  const { w, h, name, size, type } = useImageMetaStore((state) => state.meta);

  return (
    <div className="flex flex-col gap-1">
      <InfoItem label="name" value={name} />
      <InfoItem label="size" value={formatBytes(size || 0)} />
      <InfoItem label="type" value={type} />
      <InfoItem label="w" value={w && `${w}px`} />
      <InfoItem label="h" value={h && `${h}px`} />
    </div>
  );
};

"use client";

import { useImageMetaStore } from "app/canvas/_store/meta";
import { formatBytes } from "app/canvas/_utils/convert";
import { FunctionComponent } from "react";
import { InfoItem } from "./item";
import { InfoArea } from "./Area";

interface FileInfoProps {}

export const FileInfo: FunctionComponent<FileInfoProps> = () => {
  const meta = useImageMetaStore((state) => state.meta);

  return (
    <>
      <div className="flex flex-col gap-1 p-2">
        <h5 className="font-bold text-gray-400">이미지 정보</h5>
        <InfoItem label="원본명" value={meta.name} />
        <InfoItem label="크기" value={formatBytes(meta.size || 0, 3)} />
        <InfoItem label="유형" value={meta.type} />
        <InfoItem label="폭" value={meta.w && `${meta.w}px`} />
        <InfoItem label="높이" value={meta.h && `${meta.h}px`} />
      </div>
      <hr className="border-gray-700 mt-1 mb-1" />
      <div className="flex flex-col gap-1 p-2">
        <h5 className="font-bold text-gray-400">벡터 정보</h5>
        <InfoArea />
      </div>
    </>
  );
};

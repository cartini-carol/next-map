"use client";

import { DragEvent, FunctionComponent } from "react";

export const Upload: FunctionComponent = () => {
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e?.dataTransfer?.items);
  };

  return (
    <div
      className="border-dashed border-gray-500 border-2 p-2 h-28 flex align-middle justify-center"
      draggable
      onDrop={dropHandler}
      onDragOver={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      }}
    >
      drag n drop
    </div>
  );
};

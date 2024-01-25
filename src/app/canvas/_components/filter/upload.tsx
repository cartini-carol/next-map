"use client";

import { DragEvent, FunctionComponent, useEffect, useState } from "react";

export const Upload: FunctionComponent = () => {
  const [imageData, setImageData] = useState<File | undefined>();

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match("image.*")) {
          return;
        }

        setImageData(files[i]);
      }
    }
  };

  useEffect(() => {
    if (imageData) {
      const reader = new FileReader();

      const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      reader.addEventListener("load", (e) => {
        const img = new Image();
        if (e.target?.result) {
          img.addEventListener("load", () => {
            const wr = canvas.width / img.width;
            const hr = canvas.height / img.height;
            const scale = Math.min(wr, hr);

            const dx = canvas.width / 2 - (img.width / 2) * scale;
            const dy = canvas.height / 2 - (img.height / 2) * scale;

            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(img, dx, dy, img.width * scale, img.height * scale);
          });
          img.src = e.target.result as string;
        }
      });
      reader.readAsDataURL(imageData);
    }
  }, [imageData]);

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

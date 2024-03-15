"use client";

import { useMapAreaStore } from "app/canvas/_store/area";
import { useLayerStore } from "app/canvas/_store/layer";
import { useImageMetaStore } from "app/canvas/_store/meta";
import {
  ChangeEvent,
  DragEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { lightDB } from "utils/indexed.db";

export const Upload: FunctionComponent = () => {
  const setMeta = useImageMetaStore((state) => state.setMeta);
  const removeArea = useMapAreaStore((state) => state.removeArea);
  const { id, setId } = useLayerStore();
  const ref = useRef<HTMLInputElement>(null);

  const [imageData, setImageData] = useState<File | undefined>();

  /**
   * 드래그앤드롭 핸들러
   * @param e
   * @returns
   */
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

  /**
   * 파일 업로드 핸들러
   * @param e
   */
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length) {
      setImageData(e.target.files[0]);
    }
  };

  const saveImg = async (src: File, properties: any) => {
    try {
      const ids: number[] = [];
      await lightDB.images.each((data) => ids.push(data.id as number));

      const layers = lightDB.layers.filter(
        (data) =>
          data.sourceType === "Image" && ids.includes(data.sourceId || 0)
      );
      lightDB.images.bulkDelete(ids);
      layers.delete();

      const sourceId = await lightDB.images.add({
        blob: src,
        properties,
      });

      if (sourceId) {
        const layerId = await lightDB.layers.add({
          sourceId: +sourceId,
          sourceType: "Image",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        setId(+layerId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (imageData) {
      const reader = new FileReader(); // 업로드된 파일 읽기

      const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      /**
       * 캔버스 해상도 조절
       */
      const dpr = window.devicePixelRatio;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx?.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      reader.addEventListener("load", (e) => {
        // 파일 로드
        const img = new Image(); // 이미지 처리
        if (e.target?.result) {
          img.addEventListener("load", () => {
            const w = img.naturalWidth; // 실 사이즈
            const h = img.naturalHeight; // 실 사이즈

            const properties = {
              w: img.naturalWidth,
              h: img.naturalHeight,
              name: imageData.name, // 이미지명
              size: imageData.size, // 이미지 사이즈
              type: imageData.type, // 이미지 유형
            };

            /**
             * 비율 구하기
             */
            const wr = canvas.width / w;
            const hr = canvas.height / h;

            const scale = Math.min(wr, hr); // w, h 보다 작은 비율 로 처리 (view 안에 담기도록)

            /**
             * 캔버스 중간에 이미지 중심 올 수 있도록 버퍼값 구하기
             * d = canvas.center - view-image.center (실제 이미지 사이즈가 아니라, canvas에 그려질 비율조정된 이미지 사이즈)
             */
            const dx = canvas.width / 2 - (w * scale) / 2; // 캔버스 중심에 이미지 중심오도록 버퍼값
            const dy = canvas.height / 2 - (h * scale) / 2;

            setMeta({
              ...properties,
              dx,
              dy,
              scale,
            });
            removeArea(); // 벡터정보 삭제

            ctx?.reset(); // 기존 이미지 지우기
            ctx?.drawImage(
              img,
              0,
              0,
              img.width,
              img.height,
              dx,
              dy,
              w * scale,
              h * scale
            );
            saveImg(imageData, properties);
          });
          img.src = e.target.result as string;
        }
      });
      reader.readAsDataURL(imageData);
    }
  }, [imageData, setMeta, removeArea]);

  return (
    <div
      className="border-dashed border-gray-500 border-2 p-2 h-28 flex align-middle justify-center cursor-pointer"
      draggable
      onDrop={dropHandler}
      onDragOver={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      }}
      onClick={(e) => {
        ref.current?.click();
      }}
    >
      <input
        ref={ref}
        type="file"
        hidden
        accept="image/*"
        multiple={false}
        onChange={uploadHandler}
      />
      클릭 또는 파일 드래그
    </div>
  );
};

"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useImageMetaStore } from "../_store/meta";

export const Canvas: FunctionComponent = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const meta = useImageMetaStore((state) => state.meta);

  const [isDrag, setIsDrag] = useState(false);
  const [position, setPosition] = useState<[number, number] | []>([]);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const bounding = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio;
    const dragStart = (e: MouseEvent) => {
      setIsDrag(true);

      const x = e.clientX * dpr - (bounding?.left || 0);
      const y = e.clientY * dpr - (bounding?.top || 0);

      setRect({ x, y, w: 0, h: 0 });
    };

    const dragging = (e: MouseEvent) => {
      setPosition([
        e.clientX * dpr - (bounding?.left || 0),
        e.clientY * dpr - (bounding?.top || 0),
      ]);
    };

    const dragEnd = (e: MouseEvent) => {
      if (isDrag) {
        const x = e.clientX * dpr - (bounding?.left || 0);
        const y = e.clientY * dpr - (bounding?.top || 0);

        setRect((prev) => ({
          ...prev,
          w: x - (prev.x || x),
          h: y - (prev.y || y),
        }));
        setIsDrag(false);
      }
    };

    if (ref?.current && meta.name) {
      ref.current.addEventListener("mousedown", dragStart);
      ref.current.addEventListener("mousemove", dragging);
      ref.current.addEventListener("mouseup", dragEnd);
    }

    return () => {
      ref.current?.removeEventListener("mousedown", dragStart);
      ref.current?.removeEventListener("mousemove", dragging);
      ref.current?.removeEventListener("mouseup", dragEnd);
    };
  }, [ref, isDrag, meta]);

  useEffect(() => {
    if (
      isDrag === false &&
      Object.values(rect)?.filter((v) => v)?.length === 4
    ) {
      const canvas = ref.current as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");

      ctx?.beginPath();
      ctx?.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
  }, [isDrag, rect, ref]);

  return (
    <>
      <canvas
        id="canvas"
        width="1000"
        height="1000"
        className="absolute w-full h-full"
        ref={ref}
      />
      <div className="absolute bottom-1 right-1">
        {position && position.map((v) => `${v}px`).join(" / ")}
      </div>
    </>
  );
};

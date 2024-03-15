import { PositionType } from "model/source/type";
import { useEffect, useState } from "react";

export const useDraw = (target?: string) => {
  const [pos, setPos] = useState<PositionType[]>([]);
  const [start, setStart] = useState<PositionType | undefined>();
  const [end, setEnd] = useState<PositionType | undefined>();

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector(
      target || "#canvas"
    ) as HTMLCanvasElement;
    const dpr = window.devicePixelRatio;
    if (canvas) {
      const dragStart = (e: MouseEvent) => {
        setDrawing(true);
        setEnd(undefined);

        const x = e.clientX * dpr;
        const y = e.clientY * dpr;

        setStart([x, y]);
      };
      const dragEnd = (e: MouseEvent) => {
        setDrawing(true);

        if (drawing) {
          const x = e.clientX * dpr;
          const y = e.clientY * dpr;
          setEnd([x, y]);
        }
      };

      canvas.addEventListener("mousedown", dragStart);
      canvas.addEventListener("mouseup", dragEnd);

      return () => {
        canvas.removeEventListener("mousedown", dragStart);
        canvas.removeEventListener("mouseup", dragEnd);
      };
    }
  }, [target, drawing]);

  useEffect(() => {
    if (start && end) {
      setPos([start, end]);
    }
  }, [start, end]);

  return pos;
};

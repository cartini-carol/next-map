import { useImageMetaStore } from "app/canvas/_store/meta";
import { PositionType } from "model/source/type";
import { FunctionComponent, useEffect, useState } from "react";

interface CanvasPositionProps {
  target?: string;
  onChange?: (pos: PositionType | undefined) => void;
}

/**
 * canvas 위치정보
 * @param param0
 * @returns
 */
export const CanvasPosition: FunctionComponent<CanvasPositionProps> = ({
  target = "#canvas",
  onChange = () => void 0,
}) => {
  const [position, setPosition] = useState<PositionType | undefined>();
  const meta = useImageMetaStore((state) => state.meta);

  useEffect(() => {
    const cvs = document.querySelector(target) as HTMLCanvasElement;
    if (cvs && meta) {
      const dpr = window.devicePixelRatio;

      const dragging = (e: MouseEvent) => {
        const x = e.clientX * dpr;
        const y = e.clientY * dpr;
        const dx = meta.dx || 0;
        const dy = meta.dy || 0;
        const dw = dx + (meta.w || 0) * (meta?.scale || 0);
        const dh = dy + (meta.h || 0) * (meta?.scale || 0);

        if (x >= dx && x <= dw && y >= dy && y <= dh) {
          setPosition([
            Math.floor((x - dx) / (meta.scale || 0) / dpr), // 이미지 800px 기준
            Math.floor((y - dy) / (meta.scale || 0) / dpr),
          ]);
        } else {
          setPosition(undefined);
        }
      };

      cvs?.addEventListener("mousemove", dragging);

      return () => {
        cvs?.removeEventListener("mousemove", dragging);
      };
    }
  }, [target, meta]);

  useEffect(() => {
    onChange(position);
  }, [position]);

  return (
    <div className="absolute bottom-1 right-1">
      {position && position.map((v) => `${v}px`).join("  ")}
    </div>
  );
};

import { FunctionComponent, useEffect, useRef } from "react";

interface GuideLineProps {
  target?: string;
}

export const GuideLine: FunctionComponent<GuideLineProps> = ({
  target = "#canvas",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cvs = document.querySelector(target) as HTMLCanvasElement;
    const left = document.querySelector(`#guide-left`) as HTMLDivElement;
    const top = document.querySelector(`#guide-top`) as HTMLDivElement;
    if (cvs) {
      const dragging = (e: MouseEvent) => {
        left.style.left = `${e.offsetX}px`;
        top.style.top = `${e.offsetY}px`;
      };

      cvs?.addEventListener("mousemove", dragging);

      return () => {
        cvs?.removeEventListener("mousemove", dragging);
      };
    }
  }, [target]);

  return (
    <div ref={ref} id="guide-line">
      <div
        id="guide-left"
        className={`absolute h-full w-[1px] bg-gray-400 top-0 pointer-events-none`}
      />
      <div
        id="guide-top"
        className={`absolute h-[1px] w-full bg-gray-400 left-0 pointer-events-none`}
      />
    </div>
  );
};

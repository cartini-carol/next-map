import { FunctionComponent, useEffect } from "react";

interface SpyViewProps {
  target?: string;
}

export const SpyView: FunctionComponent<SpyViewProps> = ({
  target = "#canvas",
}) => {
  useEffect(() => {
    const canvas = document.querySelector(
      target || "#canvas"
    ) as HTMLCanvasElement;
    const bounding = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio;
    if (canvas) {
      const moveHandler = (e: MouseEvent) => {
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const x = e.clientX * dpr;
        const y = e.clientY * dpr;
        const offset = 100;

        const imgData = ctx.getImageData(
          x - offset / 2,
          y - offset / 2,
          offset,
          offset
        );

        const spyCanvas = document.querySelector(
          "#spyCanvas"
        ) as HTMLCanvasElement;

        if (bounding.width - 100 > e.offsetX + 10) {
          // 우측에 가까운지 체크
          (spyCanvas.parentElement as HTMLDivElement).style.left = `${
            e.offsetX + 10
          }px`;
          (spyCanvas.parentElement as HTMLDivElement).style.right = "unset";
        } else {
          (spyCanvas.parentElement as HTMLDivElement).style.right = `${
            bounding.width - e.offsetX + 10
          }px`;
          (spyCanvas.parentElement as HTMLDivElement).style.left = "unset";
        }

        if (bounding.height - 100 > e.offsetY + 10) {
          (spyCanvas.parentElement as HTMLDivElement).style.top = `${
            e.offsetY + 10
          }px`;
          (spyCanvas.parentElement as HTMLDivElement).style.bottom = "unset";
        } else {
          (spyCanvas.parentElement as HTMLDivElement).style.top = "unset";
          (spyCanvas.parentElement as HTMLDivElement).style.bottom = `${
            bounding.height - e.offsetY + 10
          }px`;
        }

        const ctx2 = spyCanvas.getContext("2d") as CanvasRenderingContext2D;
        ctx2.reset();
        ctx2.beginPath();
        ctx2.putImageData(imgData, 0, 0);
        ctx2.scale(dpr * 4, dpr * 4);
      };

      canvas?.addEventListener("mousemove", moveHandler);

      return () => {
        canvas?.removeEventListener("mousemove", moveHandler);
      };
    }
  }, [target]);

  return (
    <div
      className="absolute w-[100px] h-[100px] rounded-full overflow-hidden shadow-2xl
    before:absolute before:w-[1px] before:h-[100px] before:top-0 before:left-1/2 before:bg-gray-500
    after:absolute after:w-[100px] after:h-[1px] after:top-1/2 after:left-0 after:bg-gray-500
    "
    >
      <canvas
        id="spyCanvas"
        width={100}
        height={100}
        className="w-[100px] h-[100px] bg-slate-300"
      />
    </div>
  );
};

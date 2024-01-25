import { Canvas } from "./_components/canvas";
import { Upload } from "./_components/filter/upload";

export const metadata = {
  title: "캔버스",
};

export default async function CanvasPage() {
  return (
    <div
      id="canvas-zone"
      className="w-full h-full grid grid-flow-row grid-cols-12 gap-2"
    >
      <div className="relative row-start-1 row-span-6 col-span-10 bg-slate-300">
        <Canvas />
      </div>
      <div
        id="drag-zone"
        className="relative col-span-2 row-start-1 row-end-2 pt-2 pr-2"
      >
        <Upload />
      </div>
    </div>
  );
}

"use client";

import { FunctionComponent, useRef } from "react";

export const Canvas: FunctionComponent = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      id="canvas"
      width="100%"
      height="100%"
      className="absolute w-full h-full"
      ref={ref}
    />
  );
};

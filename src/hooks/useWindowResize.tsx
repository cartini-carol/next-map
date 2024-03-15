import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

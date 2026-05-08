import { useEffect, useState } from "react";

interface ParallaxPosition {
  x: number;
  y: number;
}

export function useParallax(): ParallaxPosition {
  const [pos, setPos] = useState<ParallaxPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = ((e.gamma ?? 0) / 45);
      const y = ((e.beta ?? 0) / 45);
      setPos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return pos;
}

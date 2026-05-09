import { useRef } from "react";

export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (px - 0.5) * max * 2;
    const ry = (0.5 - py) * max * 2;
    el.style.setProperty("--rx", String(rx));
    el.style.setProperty("--ry", String(ry));
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0");
    el.style.setProperty("--ry", "0");
  };

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

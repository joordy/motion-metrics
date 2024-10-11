import { useCallback, useEffect, useRef, useState } from "react";

interface Rect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const useMeasure = (): [React.RefObject<HTMLDivElement>, Rect | undefined] => {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<Rect | undefined>(undefined);

  const setMeasuredRect = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      });
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => setMeasuredRect());
    observer.observe(element);

    // Initial measurement
    setMeasuredRect();

    return () => {
      observer.disconnect();
    };
  }, [setMeasuredRect]);

  return [ref, rect];
};

export default useMeasure;

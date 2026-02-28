import { useRef, useState } from "react";

export const useSwipeDismiss = (onDismiss) => {
  const startX = useRef(0);
  const [offsetX, setOffsetX] = useState(0);

  const onStart = (x) => {
    startX.current = x;
  };

  const onMove = (x) => {
    const diff = x - startX.current;
    if (diff > 0) setOffsetX(diff); 
  };

  const onEnd = () => {
    if (offsetX > 120) {
      onDismiss();
    } else {
      setOffsetX(0); 
    }
  };

  return {
    offsetX,
    handlers: {
      onTouchStart: (e) => onStart(e.touches[0].clientX),
      onTouchMove: (e) => onMove(e.touches[0].clientX),
      onTouchEnd: onEnd,

      onMouseDown: (e) => onStart(e.clientX),
      onMouseMove: (e) => startX.current && onMove(e.clientX),
      onMouseUp: onEnd,
      onMouseLeave: onEnd,
    },
  };
};

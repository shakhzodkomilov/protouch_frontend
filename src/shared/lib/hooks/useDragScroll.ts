"use client";

import { useCallback, useRef } from "react";

type DragInfo = {
  isDown: boolean;
  startX: number;
  scrollLeftStart: number;
};

export function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<DragInfo>({
    isDown: false,
    startX: 0,
    scrollLeftStart: 0,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const slider = scrollRef.current;
    if (!slider) return;
    dragInfo.current = {
      isDown: true,
      startX: e.pageX - slider.offsetLeft,
      scrollLeftStart: slider.scrollLeft,
    };
    slider.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragInfo.current.startX) * 1.5;
    slider.scrollLeft = dragInfo.current.scrollLeftStart - walk;
  }, []);

  const stopDragging = useCallback(() => {
    const slider = scrollRef.current;
    if (slider) slider.style.cursor = "grab";
    dragInfo.current.isDown = false;
  }, []);

  const preventClickIfDragged = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragInfo.current.isDown && Math.abs(dragInfo.current.scrollLeftStart - (scrollRef.current?.scrollLeft ?? 0)) > 5) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [],
  );

  const scrollLeft = useCallback((step: number = 300) => {
    const slider = scrollRef.current;
    if (slider) slider.scrollBy({ left: -step, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback((step: number = 300) => {
    const slider = scrollRef.current;
    if (slider) slider.scrollBy({ left: step, behavior: "smooth" });
  }, []);

  return {
    scrollRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: stopDragging,
      onMouseLeave: stopDragging,
      onClickCapture: preventClickIfDragged,
    },
    scrollLeft,
    scrollRight,
  };
}

"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let scrollInstance: { destroy?: () => void } | null = null;

    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollInstance = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]") as HTMLElement,
        smooth: true,
        lerp: 0.08
      });
    };

    initScroll();

    return () => {
      if (scrollInstance?.destroy) {
        scrollInstance.destroy();
      }
    };
  }, []);

  return null;
}

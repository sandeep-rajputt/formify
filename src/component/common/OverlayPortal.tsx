// components/common/OverlayPortal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function OverlayPortal({
  children,
  containerId = "__next_overlay_portal__",
}: {
  children: React.ReactNode;
  containerId?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", containerId);
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100vw";
      container.style.height = "100vh";
      container.style.zIndex = "999999999";
      document.body.appendChild(container);
    }

    containerRef.current = container;
    setMounted(true);

    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [containerId]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(children, containerRef.current);
}

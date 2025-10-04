// components/common/OverlayPortal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface OverlayPortalProps {
  children: React.ReactNode;
}

export default function OverlayPortal({ children }: OverlayPortalProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById("main-container");

    if (!container) {
      console.warn(`OverlayPortal: #main-container not found in DOM.`);
      return;
    }

    containerRef.current = container;
    setMounted(true);
  }, []);

  if (!mounted || !containerRef.current) return null;

  return createPortal(children, containerRef.current);
}

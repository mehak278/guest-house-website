"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Position updates
    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Apply scaling hover logic
    const applyHoverBindings = () => {
      const hoverables = document.querySelectorAll(
        "a, button, .room-card, .service-card, .gallery-item, .accordion-header, .filter-btn, .room-select-card"
      );
      
      hoverables.forEach((item) => {
        // Clean old listeners to avoid multiple attachments
        item.removeEventListener("mouseenter", addHoverClass);
        item.removeEventListener("mouseleave", removeHoverClass);
        
        item.addEventListener("mouseenter", addHoverClass);
        item.addEventListener("mouseleave", removeHoverClass);
      });
    };

    const addHoverClass = () => {
      cursorRef.current?.classList.add("hovered");
    };

    const removeHoverClass = () => {
      cursorRef.current?.classList.remove("hovered");
    };

    // Initial binding
    applyHoverBindings();

    // Watch for DOM shifts (e.g. dynamic room sorting, modal loadings)
    const observer = new MutationObserver(applyHoverBindings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [pathname]); // Re-bind on navigation

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" id="customCursor"></div>
      <div ref={dotRef} className="custom-cursor-dot" id="customCursorDot"></div>
    </>
  );
}

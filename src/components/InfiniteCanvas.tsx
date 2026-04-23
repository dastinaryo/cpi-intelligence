import { useEffect, useRef } from "react";
import worldMap from "@/assets/world-map.jpg";

/**
 * Infinite pannable & zoomable canvas with a grid background.
 * - Click & drag to pan (any direction, no limits)
 * - Mouse wheel to zoom in/out
 * - Inertia / momentum after release
 * - Pure canvas rendering via requestAnimationFrame
 */
const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- View state ---
    let offsetX = 0;
    let offsetY = 0;
    let scale = 1;
    const minScale = 0.2;
    const maxScale = 5;

    // --- Drag / inertia state ---
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    const friction = 0.92;

    let dpr = window.devicePixelRatio || 1;

    // --- Texture ---
    const img = new Image();
    img.src = worldMap;
    let imgReady = false;
    img.onload = () => {
      imgReady = true;
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Ocean fallback
      ctx.fillStyle = "#cfe7ee";
      ctx.fillRect(0, 0, w, h);

      if (!imgReady) return;

      const tileW = img.width * scale * dpr;
      const tileH = img.height * scale * dpr;
      if (tileW < 1 || tileH < 1) return;

      // Wrap offset into [-tileW, 0] and [-tileH, 0]
      let startX = ((offsetX * dpr) % tileW) - tileW;
      let startY = ((offsetY * dpr) % tileH) - tileH;
      // Normalize negatives
      if (startX > 0) startX -= tileW;
      if (startY > 0) startY -= tileH;

      for (let x = startX; x < w; x += tileW) {
        for (let y = startY; y < h; y += tileH) {
          ctx.drawImage(img, x, y, tileW, tileH);
        }
      }
    };

    const tick = () => {
      if (!isDragging && (Math.abs(velocityX) > 0.05 || Math.abs(velocityY) > 0.05)) {
        offsetX += velocityX;
        offsetY += velocityY;
        velocityX *= friction;
        velocityY *= friction;
      }
      draw();
      rafId = requestAnimationFrame(tick);
    };
    let rafId = requestAnimationFrame(tick);

    // --- Pointer events ---
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      offsetX += dx;
      offsetY += dy;
      velocityX = dx;
      velocityY = dy;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = Math.exp(-e.deltaY * 0.001);
      const newScale = Math.min(maxScale, Math.max(minScale, scale * zoomFactor));
      // Zoom around cursor
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      // World point under cursor stays put
      offsetX = cx - ((cx - offsetX) * newScale) / scale;
      offsetY = cy - ((cy - offsetY) * newScale) / scale;
      scale = newScale;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 block h-screen w-screen touch-none"
      style={{ cursor: "grab" }}
      onPointerDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
      onPointerUp={(e) => (e.currentTarget.style.cursor = "grab")}
    />
  );
};

export default InfiniteCanvas;
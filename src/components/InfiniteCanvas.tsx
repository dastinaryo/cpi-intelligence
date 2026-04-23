import { useEffect, useRef } from "react";

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

    // --- Grid config ---
    const baseGridSize = 50;

    let dpr = window.devicePixelRatio || 1;

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

      // Background
      ctx.fillStyle = "#fafaf7";
      ctx.fillRect(0, 0, w, h);

      const gridSize = baseGridSize * scale * dpr;
      const ox = (offsetX * dpr) % gridSize;
      const oy = (offsetY * dpr) % gridSize;

      // Minor grid
      ctx.beginPath();
      ctx.strokeStyle = "#e5e5e0";
      ctx.lineWidth = 1;
      for (let x = ox; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = oy; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Major grid (every 5 cells)
      const majorSize = gridSize * 5;
      const mox = (offsetX * dpr) % majorSize;
      const moy = (offsetY * dpr) % majorSize;
      ctx.beginPath();
      ctx.strokeStyle = "#c8c8c0";
      ctx.lineWidth = 1.2;
      for (let x = mox; x < w; x += majorSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = moy; y < h; y += majorSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
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
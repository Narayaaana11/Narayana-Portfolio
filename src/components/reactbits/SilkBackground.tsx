import React, { useEffect, useRef } from 'react';

interface SilkBackgroundProps {
  className?: string;
  speed?: number;
  waveCount?: number;
  color?: string;
  opacity?: number;
}

/**
 * SilkBackground component (React Bits inspired)
 * Flowing organic silk shader wave canvas with fluid sine oscillation
 */
export const SilkBackground: React.FC<SilkBackgroundProps> = ({
  className = '',
  speed = 0.0012,
  waveCount = 5,
  color = '#e7dca8',
  opacity = 0.12,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    let step = 0;

    const render = () => {
      step += speed;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < waveCount; i++) {
        const offset = (i * Math.PI) / waveCount;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x += 6) {
          const y =
            height / 2 +
            Math.sin(x * 0.003 + step + offset) * 70 * Math.sin(step * 0.8 + i) +
            Math.cos(x * 0.006 - step * 1.2) * 35;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = opacity * ((i + 1) / waveCount);
        ctx.stroke();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameId.current);
    };
  }, [speed, waveCount, color, opacity]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SilkBackground;

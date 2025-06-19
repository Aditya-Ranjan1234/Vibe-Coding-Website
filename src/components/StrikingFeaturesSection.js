import React, { useRef, useEffect, useState } from 'react';
import './StrikingFeaturesSection.css';

const COLORS = ['#0047FF', '#000000', '#E0E0E0'];
const GRID_SIZE = 10;
const SHAPE_SIZE = 38;

function drawPlus(ctx, x, y, size, color, ripple = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ripple * 0.2);
  ctx.globalAlpha = 0.92 - ripple * 0.5;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-size * 0.15, -size * 0.5);
  ctx.lineTo(size * 0.15, -size * 0.5);
  ctx.lineTo(size * 0.15, -size * 0.15);
  ctx.lineTo(size * 0.5, -size * 0.15);
  ctx.lineTo(size * 0.5, size * 0.15);
  ctx.lineTo(size * 0.15, size * 0.15);
  ctx.lineTo(size * 0.15, size * 0.5);
  ctx.lineTo(-size * 0.15, size * 0.5);
  ctx.lineTo(-size * 0.15, size * 0.15);
  ctx.lineTo(-size * 0.5, size * 0.15);
  ctx.lineTo(-size * 0.5, -size * 0.15);
  ctx.lineTo(-size * 0.15, -size * 0.15);
  ctx.closePath();
  ctx.shadowColor = '#222';
  ctx.shadowBlur = 8 + ripple * 12;
  ctx.fill();
  ctx.restore();
}

const StrikingFeaturesSection = () => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const color = COLORS[(i * 3 + j * 7) % COLORS.length];
          const cx = (j + 1) * (canvas.width / (GRID_SIZE + 1));
          const cy = (i + 1) * (canvas.height / (GRID_SIZE + 1));
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let ripple = 0;
          if (dist < 120) {
            ripple = Math.max(0, 1 - dist / 120) * Math.sin(t * 0.08 + dist * 0.04);
          }
          drawPlus(ctx, cx, cy, SHAPE_SIZE, color, ripple);
        }
      }
      t += 1;
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [mouse]);

  return (
    <section className="striking-section">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={400}
        className="striking-canvas"
        onMouseMove={e => {
          const rect = e.target.getBoundingClientRect();
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setMouse({ x: -1000, y: -1000 })}
      />
      <div className="striking-content">
        <h2>Striking Features</h2>
        <p>Any simple object can be used. Our platform is as flexible as your imagination—interact with the grid to see the ripple effect in action.</p>
      </div>
    </section>
  );
};

export default StrikingFeaturesSection; 
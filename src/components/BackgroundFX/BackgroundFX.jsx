import React, { useEffect, useRef, useState } from 'react';
import './BackgroundFX.css';

// Fundo interativo do site inteiro: rede de partículas que reage ao mouse/toque.
//  - o cursor atrai/repele as partículas e acende as linhas ao redor
//  - clique/toque solta uma explosão de partículas
//  - botão no canto permite desligar o efeito (acessibilidade/desempenho)
const STORAGE_KEY = 'bg-fx';

const readEnabled = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
};

const BackgroundFX = () => {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(readEnabled);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        /* sem storage */
      }
      return next;
    });
  };

  useEffect(() => {
    if (!enabled) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const make = (x, y, burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.5 + Math.random() * 3 : 0.15 + Math.random() * 0.35;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 1.6,
        life: burst ? 1 : null, // partículas de explosão desaparecem
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(110, Math.floor((w * h) / 16000));
      const base = particles.filter((p) => p.life === null);
      while (base.length < target) base.push(make(Math.random() * w, Math.random() * h));
      particles = [...base.slice(0, target), ...particles.filter((p) => p.life !== null)];
    };

    const LINK = 130;
    const MOUSE_R = 170;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
        g.addColorStop(0, 'rgba(220, 40, 40, 0.14)');
        g.addColorStop(1, 'rgba(220, 40, 40, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520);
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (!reduce) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (mouse.active && d < MOUSE_R && d > 0.1) {
            const f = (1 - d / MOUSE_R) * 0.9; // empurra suavemente para longe do cursor
            p.vx += (dx / d) * f * 0.12;
            p.vy += (dy / d) * f * 0.12;
          }
          p.vx *= p.life === null ? 0.995 : 0.96;
          p.vy *= p.life === null ? 0.995 : 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (p.life !== null) p.life -= 0.012;
          if (p.life === null) {
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;
          }
        }
      }
      particles = particles.filter((p) => p.life === null || p.life > 0);

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const nearMouse =
              mouse.active && Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < MOUSE_R * 1.3;
            const alpha = (1 - d / LINK) * (nearMouse ? 0.7 : 0.22);
            ctx.strokeStyle = nearMouse ? `rgba(255, 90, 90, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = nearMouse ? 1.1 : 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.life === null ? 'rgba(255, 255, 255, 0.55)' : `rgba(255, 110, 110, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (document.hidden) return;
      draw();
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e) => {
      if (reduce) return;
      for (let i = 0; i < 16; i += 1) particles.push(make(e.clientX, e.clientY, true));
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  return (
    <>
      {enabled && <canvas ref={canvasRef} className="bgfx-canvas" aria-hidden="true" />}
      <button
        type="button"
        className="bgfx-toggle"
        onClick={toggle}
        aria-pressed={enabled}
        title={enabled ? 'Desativar efeito de fundo' : 'Ativar efeito de fundo'}
      >
        {enabled ? '✨' : '🚫'}
      </button>
    </>
  );
};

export default BackgroundFX;

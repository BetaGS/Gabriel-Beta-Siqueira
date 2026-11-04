import React, { useEffect, useRef, useState } from 'react';
import './TiltCard.css';

// Envolve um card com inclinação 3D que segue o mouse + brilho + animação de entrada ao rolar a página.
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TiltCard = ({ children, max = 9, delay = 0, radius = 15, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e) => {
    if (e.pointerType === 'touch' || reduceMotion()) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty('--ry', `${(x - 0.5) * 2 * max}deg`);
    el.style.setProperty('--rx', `${-(y - 0.5) * 2 * max}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${visible ? 'tilt-in' : ''} ${className}`}
      style={{ '--radius': `${radius}px`, '--delay': `${delay}ms` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="tilt-inner">
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TiltCard;

import React, { useEffect, useRef, useState } from 'react';
import { AppleIcon, PlayStoreIcon } from '../StoreIcons';
import './PhoneShowcase.css';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Exposição interativa de um app mobile: celular 3D que gira ao arrastar/passar o mouse
// e funcionalidades clicáveis que destacam a área correspondente na tela do app.
const PhoneShowcase = ({ project }) => {
  const features = project.features || [];
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(features.length > 1);
  const stageRef = useRef(null);
  const phoneRef = useRef(null);

  // Troca de funcionalidade automaticamente até a pessoa interagir
  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % features.length), 3500);
    return () => clearInterval(id);
  }, [autoplay, features.length]);

  // Rotação 3D: arrastar gira livremente; ao soltar volta para a frente; mouse parado inclina levemente
  useEffect(() => {
    const stage = stageRef.current;
    const phone = phoneRef.current;
    if (!stage || !phone) return undefined;

    const st = { rx: -4, ry: 0, tx: -4, ty: 0, dragging: false, lastX: 0, lastY: 0, hover: false };
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      st.rx += (st.tx - st.rx) * 0.1;
      st.ry += (st.ty - st.ry) * 0.1;
      phone.style.transform = `rotateX(${st.rx.toFixed(2)}deg) rotateY(${st.ry.toFixed(2)}deg)`;
    };
    tick();

    const down = (e) => {
      st.dragging = true;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
    };
    const move = (e) => {
      if (st.dragging) {
        st.ty += (e.clientX - st.lastX) * 0.7;
        st.tx = clamp(st.tx - (e.clientY - st.lastY) * 0.4, -30, 30);
        st.lastX = e.clientX;
        st.lastY = e.clientY;
      } else if (e.pointerType === 'mouse') {
        const r = stage.getBoundingClientRect();
        st.ty = ((e.clientX - r.left) / r.width - 0.5) * 36;
        st.tx = -4 - ((e.clientY - r.top) / r.height - 0.5) * 22;
      }
    };
    const up = () => {
      if (!st.dragging) return;
      st.dragging = false;
      stage.classList.remove('is-dragging');
      st.ty = Math.round(st.ty / 360) * 360; // volta para a frente pelo caminho mais curto
      st.tx = -4;
    };
    const leave = () => {
      if (!st.dragging) {
        st.ty = Math.round(st.ty / 360) * 360;
        st.tx = -4;
      }
    };

    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    stage.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
      stage.removeEventListener('pointerleave', leave);
    };
  }, []);

  const pick = (i) => {
    setAutoplay(false);
    setActive(i);
  };

  const feature = features[active];
  const hasStoreLinks = project.appStoreLink || project.playStoreLink;

  return (
    <section className="phone-showcase">
      <div className="phone-stage" ref={stageRef}>
        <span className="phone-glow" aria-hidden="true" />
        <div className="phone-float">
          <div className="phone-3d" ref={phoneRef}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="phone-layer" style={{ transform: `translateZ(${-(i + 1) * 2.5}px)` }} />
            ))}
            <div className="phone-back" aria-hidden="true">
              <span>{project.title}</span>
            </div>
            <div className="phone-body">
              <div className="phone-notch-3d" />
              <div className="phone-display">
                <img src={project.image} alt={`Tela do app ${project.title}`} draggable="false" />
                {feature?.box && (
                  <span
                    className="phone-hotspot"
                    style={{
                      left: `${feature.box[0]}%`,
                      top: `${feature.box[1]}%`,
                      width: `${feature.box[2]}%`,
                      height: `${feature.box[3]}%`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="phone-hint">↔ Arraste para girar o celular</p>
      </div>

      <div className="phone-info">
        <span className="phone-eyebrow">📱 Aplicativo mobile</span>
        <h2>{project.title}</h2>
        <p className="phone-desc">{project.description}</p>

        {features.length > 0 && (
          <>
            <div className="phone-features" role="tablist" aria-label="Funcionalidades do app">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`phone-feature ${i === active ? 'active' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span aria-hidden="true">{f.icon}</span> {f.title}
                </button>
              ))}
            </div>
            <div className="phone-feature-detail" key={active}>
              <strong>
                {feature.icon} {feature.title}
              </strong>
              <p>{feature.text}</p>
            </div>
          </>
        )}

        <div className="project-technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {hasStoreLinks ? (
          <div className="store-links">
            {project.appStoreLink && (
              <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="store-btn store-btn-apple">
                <AppleIcon />
                <span>
                  <small>Baixar na</small>
                  App Store
                </span>
              </a>
            )}
            {project.playStoreLink && (
              <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="store-btn store-btn-google">
                <PlayStoreIcon />
                <span>
                  <small>Disponível no</small>
                  Google Play
                </span>
              </a>
            )}
          </div>
        ) : (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            Ver Projeto →
          </a>
        )}
      </div>
    </section>
  );
};

export default PhoneShowcase;

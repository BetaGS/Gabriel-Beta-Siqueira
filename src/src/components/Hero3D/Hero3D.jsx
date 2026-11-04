import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero3D.css';

// Cena 3D de fundo do hero: poliedro em wireframe + anel + campo de partículas que reagem ao mouse.
const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return undefined; // sem WebGL: o hero continua só com o gradiente
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 7;

    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.9, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35 }),
    );
    const inner = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.MeshBasicMaterial({ color: 0xff5555, wireframe: true, transparent: true, opacity: 0.85 }),
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.014, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 }),
    );
    ring.rotation.x = Math.PI / 2.3;
    const ring2 = ring.clone();
    ring2.rotation.set(Math.PI / 3.2, Math.PI / 3, 0);
    group.add(core, inner, ring, ring2);

    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 3.4 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 900 ? 3.2 : 0; // em telas largas a forma fica ao lado do texto
      group.scale.setScalar(w > 900 ? 1 : 0.8);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;
    const renderFrame = () => {
      frame = requestAnimationFrame(renderFrame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!reduce) {
        core.rotation.y = t * 0.18;
        core.rotation.x = t * 0.09;
        inner.rotation.y = -t * 0.4;
        inner.rotation.z = t * 0.25;
        ring.rotation.z = t * 0.2;
        ring2.rotation.z = -t * 0.15;
        particles.rotation.y = t * 0.03;
        const s = 1 + Math.sin(t * 1.4) * 0.04;
        inner.scale.setScalar(s);
      }
      // inclina a cena na direção do mouse (suavizado)
      group.rotation.y += (mouse.x * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.05;
      particles.position.x += (-mouse.x * 0.35 - particles.position.x) * 0.04;
      particles.position.y += (mouse.y * 0.35 - particles.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    renderFrame();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      io.disconnect();
      [core, inner, ring].forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      ring2.material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero3d" ref={mountRef} aria-hidden="true" />;
};

export default Hero3D;

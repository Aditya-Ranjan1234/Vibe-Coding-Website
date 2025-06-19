import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import '../App.css';

const RippleEffectSection = () => {
  const mountRef = useRef();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const animationId = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xE0E4EB);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_time: { value: 0.0 },
      u_baseColor: { value: new THREE.Color(0xE0E4EB) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform vec3 u_baseColor;
        
        float ripple(vec2 uv, vec2 center, float t) {
          float d = distance(uv, center);
          float wave = sin(40.0 * d - t * 3.5) * 0.04 * smoothstep(0.25, 0.0, d);
          return wave;
        }
        
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec2 mouse = u_mouse;
          float t = u_time;
          
          float wave = ripple(uv, mouse, t);
          
          // Iridescent color shift
          float ca = 0.006 * smoothstep(0.3, 0.0, distance(uv, mouse));
          float r = u_baseColor.r + wave + ca * 2.0 * sin(t + 0.5);
          float g = u_baseColor.g + wave + ca * 1.5 * cos(t + 1.0);
          float b = u_baseColor.b + wave + ca * 2.5 * sin(t + 2.0);
          
          // Soft vignette
          float vignette = smoothstep(0.95, 0.7, length(uv - 0.5));
          
          gl_FragColor = vec4(r, g, b, 1.0) * vignette;
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate(time) {
      uniforms.u_time.value = time * 0.001;
      renderer.render(scene, camera);
      animationId.current = requestAnimationFrame(animate);
    }
    animate(0);

    function onMouseMove(e) {
      uniforms.u_mouse.value.set(e.clientX / width, 1.0 - e.clientY / height);
    }
    window.addEventListener('mousemove', onMouseMove);
    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, []);

  return (
    <section className="ripple-effect-section" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#E0E4EB' }}>
      <div ref={mountRef} className="ripple-canvas-mount" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} />
      {/* Optionally add overlay content here */}
    </section>
  );
};

export default RippleEffectSection; 
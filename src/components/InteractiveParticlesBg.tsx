/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface InteractiveParticlesBgProps {
  particleCount?: number;
  maxDistance?: number;
  mouseRadius?: number;
  speedFactor?: number;
  color?: string;
  lineColor?: string;
  className?: string;
}

export default function InteractiveParticlesBg({
  particleCount = 65,
  maxDistance = 110,
  mouseRadius = 140,
  speedFactor = 0.5,
  color = 'rgba(255, 255, 255, 0.25)',
  lineColor = 'rgba(255, 255, 255, 0.06)',
  className = '',
}: InteractiveParticlesBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseActiveRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      targetRadius: number;
    }> = [];

    // Initialize dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initParticles(width, height);
      }
    });

    resizeObserver.observe(container);

    const initParticles = (width: number, height: number) => {
      particles = [];
      const densityAdjustedCount = Math.min(
        particleCount,
        Math.floor((width * height) / 11000)
      );
      
      const count = Math.max(25, densityAdjustedCount);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speedFactor,
          vy: (Math.random() - 0.5) * speedFactor,
          radius: Math.random() * 1.5 + 0.8,
          targetRadius: Math.random() * 1.5 + 0.8,
        });
      }
    };

    // Tracking Loop
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const mouseActive = mouseActiveRef.current;

      // Draw Connection Lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Calculate opacity proportional to proximity
            const alpha = (1 - dist / maxDistance) * 0.45;
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse interactive connection
        if (mouseActive) {
          const mDx = p1.x - mouseRef.current.x;
          const mDy = p1.y - mouseRef.current.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

          if (mDist < mouseRadius) {
            const mAlpha = (1 - mDist / mouseRadius) * 0.75;
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${mAlpha})`);
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Interactive attraction force
            const force = (1 - mDist / mouseRadius) * 0.12;
            p1.vx -= (mDx / mDist) * force;
            p1.vy -= (mDy / mDist) * force;

            // Make interacting particle slightly larger/glow
            p1.radius = Math.min(p1.targetRadius * 1.8, p1.radius + 0.1);
          } else {
            p1.radius = Math.max(p1.targetRadius, p1.radius - 0.05);
          }
        } else {
          p1.radius = Math.max(p1.targetRadius, p1.radius - 0.05);
        }

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Friction to cap interactive velocities
        p1.vx *= 0.98;
        p1.vy *= 0.98;

        // Restore base velocity if too slow
        const currentSpeed = Math.sqrt(p1.vx * p1.vx + p1.vy * p1.vy);
        const minSpeed = 0.15;
        if (currentSpeed < minSpeed) {
          const angle = Math.random() * Math.PI * 2;
          p1.vx += Math.cos(angle) * 0.05;
          p1.vy += Math.sin(angle) * 0.05;
        }

        // Boundary collision / Wrapping
        if (p1.x < 0) p1.x = w;
        if (p1.x > w) p1.x = 0;
        if (p1.y < 0) p1.y = h;
        if (p1.y > h) p1.y = 0;

        // Draw particle dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // High performance global mouse/touch event tracking mapped back to local container coordinates
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const padding = 120; // margin threshold for attraction
      if (
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding
      ) {
        mouseRef.current = { x, y };
        mouseActiveRef.current = true;
      } else {
        mouseActiveRef.current = false;
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouseRef.current = { x, y };
        mouseActiveRef.current = true;
      } else {
        mouseActiveRef.current = false;
      }
    };

    const handleGlobalMouseLeave = () => {
      mouseActiveRef.current = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [particleCount, maxDistance, mouseRadius, speedFactor, color, lineColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-80"
      />
    </div>
  );
}

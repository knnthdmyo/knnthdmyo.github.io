'use client';

import { useEffect, useRef } from 'react';
import { EXTENDED_CODE_CHARS } from '@/constants/code-chars';

interface Block {
  x: number;
  y: number;
  text: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  bounced: boolean;
}

interface FallingCodeBlocksProps {
  onLogoHit: () => void;
}

const MAX_BLOCKS = 60;
const SPAWN_INTERVAL = 200;

export default function FallingCodeBlocks({
  onLogoHit,
}: FallingCodeBlocksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const logoRectRef = useRef<DOMRect | null>(null);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const onLogoHitRef = useRef(onLogoHit);
  onLogoHitRef.current = onLogoHit;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const updateLogoBounds = () => {
      const el = document.getElementById('loading-logo');
      if (el) logoRectRef.current = el.getBoundingClientRect();
    };

    resize();
    updateLogoBounds();
    window.addEventListener('resize', () => {
      resize();
      updateLogoBounds();
    });

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const spawnBlock = (): Block => ({
      x: Math.random() * w(),
      y: -50,
      text: EXTENDED_CODE_CHARS[
        Math.floor(Math.random() * EXTENDED_CODE_CHARS.length)
      ],
      speedX: (Math.random() - 0.5) * 2,
      speedY: 2 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 0.3 + Math.random() * 0.3,
      bounced: false,
    });

    const animate = (now: number) => {
      const blocks = blocksRef.current;

      // Spawn
      if (
        now - lastSpawnRef.current > SPAWN_INTERVAL &&
        blocks.length < MAX_BLOCKS
      ) {
        blocks.push(spawnBlock());
        lastSpawnRef.current = now;
      }

      const logo = logoRectRef.current;
      const screenW = w();
      const screenH = h();

      // Update
      let i = blocks.length;
      while (i--) {
        const b = blocks[i];
        b.x += b.speedX;
        b.y += b.speedY;
        b.rotation += b.rotationSpeed;

        // Logo collision
        if (logo && !b.bounced) {
          const bR = b.x + 60;
          const bB = b.y + 30;
          if (
            bR > logo.left &&
            b.x < logo.right &&
            bB > logo.top &&
            b.y < logo.bottom
          ) {
            b.bounced = true;
            const ax = b.x + 30 - (logo.left + logo.right) / 2;
            const ay = b.y + 15 - (logo.top + logo.bottom) / 2;
            const d = Math.sqrt(ax * ax + ay * ay) || 1;
            b.speedX = (ax / d) * 8 + (Math.random() - 0.5) * 4;
            b.speedY = (ay / d) * 8 + (Math.random() - 0.5) * 4;
            if (Math.abs(b.speedY) < 3) b.speedY = b.speedY < 0 ? -5 : 5;
            onLogoHitRef.current();
          }
        }

        if (b.bounced) b.speedY += 0.3;

        // Edge bounce
        if (b.x < 0 || b.x > screenW - 60) {
          b.speedX *= -0.8;
          b.x = Math.max(0, Math.min(b.x, screenW - 60));
        }

        // Remove off-screen
        if (b.y > screenH + 100 || b.x < -100 || b.x > screenW + 100) {
          blocks.splice(i, 1);
        }
      }

      // Draw
      ctx.clearRect(0, 0, screenW, screenH);
      ctx.font = 'bold 18px ui-monospace, monospace';
      ctx.textBaseline = 'top';

      for (const b of blocks) {
        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.translate(b.x + 30, b.y + 15);
        ctx.rotate((b.rotation * Math.PI) / 180);
        ctx.fillStyle = '#38bdf8'; // sky-400
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fillText(b.text, -15, -9);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    />
  );
}

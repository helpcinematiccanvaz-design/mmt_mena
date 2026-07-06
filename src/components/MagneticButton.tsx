/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  id,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Motion values to track actual offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for a tactile, fluid, and organic following feel
  const springConfig = { stiffness: 120, damping: 15, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find absolute center point of button bounding rect
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate vector delta from center to current mouse coordinates
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Magnetic pull distance scale (35% of vector offset)
    const pullX = deltaX * 0.35;
    const pullY = deltaY * 0.35;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    // Smoothly snap back to origin point (0, 0)
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

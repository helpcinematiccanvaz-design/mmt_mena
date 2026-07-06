/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType } from '../types';

interface PageProgressBarProps {
  currentPage: PageType;
}

export default function PageProgressBar({ currentPage }: PageProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let completeTimeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;

    // Reset and trigger progress on navigation
    setIsVisible(true);
    setProgress(15);

    // Phase 1: Rapid jump to ~40%
    const jumpTimeoutId = setTimeout(() => {
      setProgress(45);
    }, 80);

    // Phase 2: Slower increments towards 85%
    let currentProgress = 45;
    intervalId = setInterval(() => {
      currentProgress += (85 - currentProgress) * 0.15;
      setProgress(Math.min(currentProgress, 88));
    }, 150);

    // Phase 3: Simulated completion to 100% after short delay
    completeTimeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setProgress(100);

      // Phase 4: Fade out progress bar once fully loaded
      hideTimeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 250);
    }, 450);

    return () => {
      clearTimeout(jumpTimeoutId);
      clearInterval(intervalId);
      clearTimeout(completeTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, [currentPage]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="page-loading-progressbar"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none origin-left"
          style={{
            background: 'linear-gradient(90deg, #1565FF 0%, #00C8FF 50%, #00F0FF 100%)',
            boxShadow: '0 0 10px rgba(0, 200, 255, 0.6), 0 0 4px rgba(21, 101, 255, 0.4)',
            width: `${progress}%`,
            transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      )}
    </AnimatePresence>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isActive: boolean;
  color?: string;
  barCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isActive,
  color = 'bg-gradient-to-t from-[#3159E8] to-[#62E6C8]',
  barCount = 12,
  size = 'md'
}) => {
  const heights = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16'
  };

  const barWidths = {
    sm: 'w-1',
    md: 'w-1.5',
    lg: 'w-2'
  };

  return (
    <div className={`flex items-center justify-center gap-1.5 ${heights[size]}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const minH = 20;
        const maxH = 85 + (i % 3) * 15;
        const delay = (i * 0.08) % 0.6;
        const duration = 0.5 + (i % 4) * 0.15;

        return (
          <motion.span
            key={i}
            className={`rounded-full ${barWidths[size]} ${color}`}
            animate={
              isActive
                ? {
                    height: [`${minH}%`, `${maxH}%`, `${minH}%`],
                    opacity: [0.6, 1, 0.6]
                  }
                : {
                    height: '15%',
                    opacity: 0.35
                  }
            }
            transition={
              isActive
                ? {
                    repeat: Infinity,
                    duration,
                    delay,
                    ease: 'easeInOut'
                  }
                : {
                    duration: 0.3
                  }
            }
          />
        );
      })}
    </div>
  );
};

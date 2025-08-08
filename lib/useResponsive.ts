import { useState, useEffect } from 'react';
import { Breakpoint, ResponsiveConfig } from '@/types';

const breakpoints: ResponsiveConfig[] = [
  { breakpoint: 'xs', minWidth: 0, maxWidth: 639 },
  { breakpoint: 'sm', minWidth: 640, maxWidth: 767 },
  { breakpoint: 'md', minWidth: 768, maxWidth: 1023 },
  { breakpoint: 'lg', minWidth: 1024, maxWidth: 1279 },
  { breakpoint: 'xl', minWidth: 1280, maxWidth: 1535 },
  { breakpoint: '2xl', minWidth: 1536 }
];

export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      for (const bp of breakpoints) {
        if (width >= bp.minWidth && (!bp.maxWidth || width <= bp.maxWidth)) {
          setCurrentBreakpoint(bp.breakpoint);
          break;
        }
      }

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  };
}

import { useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  const breakpoint = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
  };
};
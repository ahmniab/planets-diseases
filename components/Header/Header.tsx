'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import {
  LocalFlorist,
} from '@mui/icons-material';
import Image from 'next/image';
import logo from '@/public/logo.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SharePage from './SharePage';
import { useTheme } from '../../theme';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image src={logo} alt="NBG" style={{ height: '40px', width: 'auto' }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            NBG
          </Typography>
        </Box>

        {/* Theme Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box>
            <Tooltip 
              title={
                mounted 
                /*  this used to prevent hydration mismatch, 
                    since we don't know the theme on the server, 
                    we show the light mode icon, 
                    and if it's mounted and the theme is light, 
                    we show the dark mode icon, 
                    and if it's mounted and the theme is dark, 
                    we show the light mode icon 
                    see more: https://nextjs.org/docs/messages/react-hydration-error
                */
                  ? (mode === 'light' ? 'التبديل للوضع المظلم' : 'التبديل للوضع الفاتح')
                  : 'التبديل للوضع المظلم' 
              }
            >
              <IconButton 
                onClick={toggleTheme} 
                size="small" 
                sx={{ color: 'white' }}
              >
                {mounted 
                  ? (mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />)
                  : <LightModeIcon /> 
                }
              </IconButton>    
            </Tooltip>
          </Box>
          <SharePage />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
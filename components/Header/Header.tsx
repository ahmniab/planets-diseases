'use client';
import React from 'react';
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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SharePage from './SharePage';
import { useTheme } from '../../theme';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalFlorist sx={{ fontSize: '2rem', color: 'white' }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            دليل أمراض النباتات
          </Typography>
        </Box>

        {/* Theme Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box>
          <Tooltip title={mode === 'light' ? 'التبديل للوضع المظلم' : 'التبديل للوضع الفاتح'}>
            <IconButton onClick={toggleTheme} size="small" sx={{ color: 'white' }}>
                {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
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
'use client';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 9999,
        backgroundColor: (theme) => theme.palette.background.default,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        sx={{
          color: '#228B22',
          mb: 2,
        }}
        size={40}
      />
      <Typography
        variant="body1"
        sx={{
          color: '#228B22',
          fontWeight: 500,
        }}
      >
        جاري تحميل NBG...
      </Typography>
    </Box>
  );
}
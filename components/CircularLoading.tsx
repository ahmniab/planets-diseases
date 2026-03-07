import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const CircularLoading: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: (theme) => theme.palette.background.default,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: '500px', md: '600px' },

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
};

export default CircularLoading;
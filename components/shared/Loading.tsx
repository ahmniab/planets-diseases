'use client';
import { CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
    </Box>
  );
};

export default Loading;
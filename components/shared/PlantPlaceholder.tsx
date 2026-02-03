import { Box, Typography } from '@mui/material';
// import { Eco as EcoIcon } from '@mui/icons-material';

const PlantPlaceholder = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        color: 'grey.500'
      }}
    >
      {/* <EcoIcon sx={{ fontSize: 48, mb: 1 }} /> */}
      <Typography variant="body2">
        صورة النبات
      </Typography>
    </Box>
  );
};

export default PlantPlaceholder;
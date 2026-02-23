'use client';

import { Grid, Box, Typography } from '@mui/material';
import { plant } from '@/types/plant';
import PlantCard from './PlantCard';
import { Height } from '@mui/icons-material';
// import { Eco as EcoIcon } from '@mui/icons-material';

interface PlantsGridProps {
  plants: plant[];
  onEditPlant: (plant: plant) => void;
  onDeletePlant: (plant: plant) => void;
}

const PlantsGrid = ({ plants, onEditPlant, onDeletePlant }: PlantsGridProps) => {
  if (plants.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        {/* <EcoIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} /> */}
        <Typography variant="h6" gutterBottom>
          لا توجد نباتات مضافة حالياً
        </Typography>
        <Typography variant="body2">
          ابدأ بإضافة نباتات جديدة لتظهر هنا
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {plants.map((plant) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}  key={plant.id}>
          <PlantCard
            plant={plant}
            onEdit={onEditPlant}
            onDelete={onDeletePlant}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PlantsGrid;
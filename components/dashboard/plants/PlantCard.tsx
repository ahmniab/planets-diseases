'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CardActions,
  Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, LocalHospital as DiseaseIcon } from '@mui/icons-material';
import { plant } from '@/types/plant';
import PlantPlaceholder from '@/components/shared/PlantPlaceholder';
import { useRouter } from 'next/navigation';

interface PlantCardProps {
  plant: plant;
  onEdit: (plant: plant) => void;
  onDelete: (plant: plant) => void;
}

const PlantCard = ({ plant, onEdit, onDelete }: PlantCardProps) => {
  const router = useRouter();

  const handleViewDiseases = () => {
    router.push(`/dashboard/plants/${plant.id}/diseasis`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      {plant.imgUrl ? (
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: 'cover'
          }}
          image={plant.imgUrl}
          alt={plant.name}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <PlantPlaceholder />
      )}
      
      <Box sx={{ display: 'none' }}>
        <PlantPlaceholder />
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="h3"
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 1
          }}
        >
          {plant.name}
        </Typography>
        
        <Button
          fullWidth
          variant="outlined"
          startIcon={<DiseaseIcon />}
          onClick={handleViewDiseases}
          sx={{
            mt: 2,
            direction: 'rtl',
          }}
        >
          &nbsp;
          عرض الأمراض
        </Button>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <IconButton 
          color="primary" 
          onClick={() => onEdit(plant)}
          aria-label={`تحرير ${plant.name}`}
        >
          <EditIcon />
        </IconButton>
        
        <IconButton 
          color="error" 
          onClick={() => onDelete(plant)}
          aria-label={`حذف ${plant.name}`}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PlantCard;
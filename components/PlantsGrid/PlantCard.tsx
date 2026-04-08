'use client';
import { FC } from 'react';
import { plant } from '../../types/plant';
import { 
    Typography, 
    Card, 
    CardMedia, 
    CardContent,
    Button,
    Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface PlantProps {
  Plant: plant;
}

const PlantCard: FC<PlantProps> = ({ Plant }) => {
    const router = useRouter();
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={Plant.imgUrl}
        alt={Plant.name}
      />
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
            {Plant.name}
          </Typography>
          <Button 
            size="small" 
            color="primary" 
            href={`/content/plants/${Plant.id}/diseases`}
          >
            عرض
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
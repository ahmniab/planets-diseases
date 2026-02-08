'use client';
import { FC } from 'react';
import { plant } from '../../types/plant';
import { 
    Typography, 
    Card, 
    CardMedia, 
    CardContent,
    Button,
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
        <Typography gutterBottom variant="h5" component="div">
          {Plant.name}
        </Typography>
        <Button size="small" color="primary" 
            onClick={() => router.push(`/content/plants/${Plant.id}/diseases`)}>
          عرض أمراض النبات
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
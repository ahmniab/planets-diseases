'use client';

import {
    Card,
    CardMedia,
    CardContent,
    Button,
    Typography,
    Box,
} from '@mui/material';

import { disease } from "@/types/disease"; 
import { useRouter } from 'next/navigation';

interface DiseaseCardProps {
    disease: disease;
}
const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease }) => {
    const router = useRouter();
    return (
        <Card /*variant="outlined"*/>
            <CardMedia
                component="img"
                height="140"
                image={disease.mainImageUrl}
                alt={disease.title}
            />
            <CardContent>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    mb: 2 
                }}>
                    <Typography variant="h5">{disease.title}</Typography>
                    <Button
                        // variant="outlined"
                        href={`/content/diseases/${disease.id}`}
                        size='small'
                        color='primary'
                    >
                        عرض التفاصيل
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
export default DiseaseCard;
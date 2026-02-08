'use client';

import {
    Card,
    Button,
    Typography,
} from '@mui/material';

import { disease } from "@/types/disease"; 
import { useRouter } from 'next/navigation';

interface DiseaseCardProps {
    disease: disease;
}
const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease }) => {
    const router = useRouter();
    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Typography variant="h5">{disease.title}</Typography>
            <Button
                variant="contained"
                onClick={() => router.push(`/content/diseases/${disease.id}`)}
                sx={{ mt: 'auto' }}
            >
                عرض التفاصيل
            </Button>
        </Card>
    );
};
export default DiseaseCard;
'use client';

import { Grid, Box, Typography, CircularProgress, Alert, styled } from '@mui/material';
import { disease } from '@/types/disease';
import DiseaseCard from './DiseaseCard';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const EmptyStateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 2),
    textAlign: 'center',
    minHeight: 400,
}));

const EmptyStateIcon = styled(LocalFloristIcon)(({ theme }) => ({
    fontSize: 80,
    color: theme.palette.grey[400],
    marginBottom: theme.spacing(2),
}));

interface DiseasesGridProps {
    diseases: disease[];
    isLoading?: boolean;
    error?: Error | null;
    onEdit?: (disease: disease) => void;
    onDelete?: (disease: disease) => void;
}

export default function DiseasesGrid({ diseases, isLoading, error, onEdit, onDelete }: DiseasesGridProps) {
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error" sx={{ direction: 'rtl' }}>
                    <Typography variant="body1">
                        حدث خطأ أثناء تحميل الأمراض: {error.message}
                    </Typography>
                </Alert>
            </Box>
        );
    }

    if (!diseases || diseases.length === 0) {
        return (
            <EmptyStateContainer>
                <EmptyStateIcon />
                <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                        fontWeight: 600,
                        color: 'text.secondary',
                    }}
                >
                    لا توجد أمراض مسجلة
                </Typography>
                <Typography 
                    variant="body1" 
                    color="text.secondary"
                >
                    لم يتم إضافة أي أمراض لهذا النبات بعد
                </Typography>
            </EmptyStateContainer>
        );
    }

    return (
        <Grid container spacing={3}>
            {diseases.map((disease) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={disease.id}>
                    <DiseaseCard 
                        disease={disease}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

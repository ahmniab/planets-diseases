'use client';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    styled,
    useTheme,
    IconButton,
    CardActions,
    Button,
} from '@mui/material';
import { disease } from '@/types/disease';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 12px 24px rgba(0, 0, 0, 0.4)'
            : '0 12px 24px rgba(0, 0, 0, 0.15)',
        borderColor: theme.palette.primary.main,
    },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    height: 200,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.03)',
}));


interface DiseaseCardProps {
    disease: disease;
    onEdit?: (disease: disease) => void;
    onDelete?: (disease: disease) => void;
}

export default function DiseaseCard({ disease, onEdit, onDelete }: DiseaseCardProps) {
    const theme = useTheme();

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.(disease);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(disease);
    };


    return (
        <StyledCard elevation={2}>
            <StyledCardMedia
                image={disease.mainImageUrl}
                title={disease.title}
            >
            </StyledCardMedia>
            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: theme.palette.text.primary,
                        mb: 1,
                        textAlign: 'right',
                        direction: 'rtl',
                        lineHeight: 1.4,
                    }}
                >
                    {disease.title}
                </Typography>

                {disease.docId && (
                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        startIcon={<DescriptionIcon />}
                        href={`/dashboard/diseases/${disease.id}/edit`}
                        sx={{
                            mt: 2,
                            direction: 'ltr',
                        }}
                    >
                        تعديل الوثيقة
                    </Button>
                )}
            </CardContent>
            
            {(onEdit || onDelete) && (
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    {onEdit && (
                        <IconButton 
                            color="primary" 
                            onClick={handleEdit}
                            aria-label={`تعديل ${disease.name}`}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                    
                    {onDelete && (
                        <IconButton 
                            color="error" 
                            onClick={handleDelete}
                            aria-label={`حذف ${disease.name}`}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardActions>
            )}
        </StyledCard>
    );
}

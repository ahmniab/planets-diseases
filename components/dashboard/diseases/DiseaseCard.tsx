'use client';

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
    Box,
    Chip,
    styled,
    useTheme,
    IconButton,
    CardActions,
    Button,
} from '@mui/material';
import { disease } from '@/types/disease';
import { useRouter } from 'next/navigation';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
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

const ImageOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

interface DiseaseCardProps {
    disease: disease;
    onEdit?: (disease: disease) => void;
    onDelete?: (disease: disease) => void;
}

export default function DiseaseCard({ disease, onEdit, onDelete }: DiseaseCardProps) {
    const router = useRouter();
    const theme = useTheme();

    const handleClick = () => {
        router.push(`/diseases/${disease.id}`);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.(disease);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(disease);
    };

    const handleEditDoc = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/dashboard/diseases/${disease.id}/edit`);
    };

    return (
        <StyledCard elevation={2}>
            <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <StyledCardMedia
                    image={disease.mainImageUrl || '/placeholder-disease.jpg'}
                    title={disease.title}
                >
                    <ImageOverlay>
                        <LocalFloristIcon sx={{ color: 'white', fontSize: 20 }} />
                        <Chip
                            label={disease.name}
                            size="small"
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(46, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                            }}
                        />
                    </ImageOverlay>
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
                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
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
                            onClick={handleEditDoc}
                            sx={{
                                mt: 2,
                                direction: 'rtl',
                                fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                            }}
                        >
                            تعديل الوثيقة
                        </Button>
                    )}
                </CardContent>
            </CardActionArea>
            
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

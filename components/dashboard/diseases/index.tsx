'use client';

import {
    Container,
    Box,
    Typography,
    Paper,
    Breadcrumbs,
    Link,
    styled,
    Skeleton,
    Button,
    Alert,
    Snackbar,
} from '@mui/material';
import { 
    usePlantDiseases, 
    useCreateDisease, 
    useUpdateDisease, 
    useDeleteDisease 
} from '@/hooks/useDiseases';
import DiseasesGrid from './DiseasesGrid';
import DiseaseFormDialog from './DiseaseFormDialog';
import DeleteDiseaseDialog from './DeleteDiseaseDialog';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { plant } from '@/types/plant';
import { disease, diseaseSummary } from '@/types/disease';
import { useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(66, 66, 74, 0.8) 0%, rgba(25, 25, 25, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.8) 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.4)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    textAlign: 'right',
    direction: 'rtl',
}));

interface PlantDiseasesPageProps {
    plantId: string;
}

export default function PlantDiseasesPage({ plantId }: PlantDiseasesPageProps) {
    const router = useRouter();
    const { data: diseases, isLoading: diseasesLoading, error: diseasesError } = usePlantDiseases(plantId);
    
    // Fetch plant details
    const { data: plant, isLoading: plantLoading } = useQuery<plant>({
        queryKey: ['plant', plantId],
        queryFn: async () => {
            const response = await axios.get(`/api/plants/${plantId}`);
            return response.data;
        },
    });

    // Dialog states
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState<disease | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Mutations
    const createMutation = useCreateDisease(plantId);
    const updateMutation = useUpdateDisease(plantId);
    const deleteMutation = useDeleteDisease(plantId);

    const handleBreadcrumbClick = (path: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        router.push(path);
    };

    const handleAddClick = () => {
        setSelectedDisease(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (disease: disease) => {
        setSelectedDisease(disease);
        setFormDialogOpen(true);
    };

    const handleDelete = (disease: disease) => {
        setSelectedDisease(disease);
        setDeleteDialogOpen(true);
    };

    const handleFormSubmit = async (data: diseaseSummary) => {
        try {
            if (selectedDisease) {
                await updateMutation.mutateAsync({ id: selectedDisease.id, data });
                setSnackbar({ open: true, message: 'تم تحديث المرض بنجاح', severity: 'success' });
            } else {
                await createMutation.mutateAsync(data);
                setSnackbar({ open: true, message: 'تم إضافة المرض بنجاح', severity: 'success' });
            }
            setFormDialogOpen(false);
        } catch (error) {
            setSnackbar({ open: true, message: 'حدث خطأ أثناء الحفظ', severity: 'error' });
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedDisease) return;
        
        try {
            await deleteMutation.mutateAsync(selectedDisease.id);
            setSnackbar({ open: true, message: 'تم حذف المرض بنجاح', severity: 'success' });
            setDeleteDialogOpen(false);
        } catch (error) {
            setSnackbar({ open: true, message: 'حدث خطأ أثناء الحذف', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <StyledPaper>
                <HeaderContainer>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" sx={{ transform: 'rotate(180deg)' }} />}
                        sx={{ mb: 2, direction: 'rtl' }}
                    >
                        <Link
                            component="button"
                            variant="body1"
                            onClick={handleBreadcrumbClick('/dashboard')}
                            sx={{
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            لوحة التحكم
                        </Link>
                        <Link
                            component="button"
                            variant="body1"
                            onClick={handleBreadcrumbClick('/dashboard/plants')}
                            sx={{
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            النباتات
                        </Link>
                        <Typography
                            color="text.primary"
                        >
                            {plantLoading ? <Skeleton width={100} /> : plant?.name || 'الأمراض'}
                        </Typography>
                    </Breadcrumbs>

                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 1,
                        }}
                    >
                        {plantLoading ? (
                            <Skeleton width={300} />
                        ) : (
                            `أمراض ${plant?.name || 'النبات'}`
                        )}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {diseasesLoading ? (
                                <Skeleton width={200} />
                            ) : (
                                `${diseases?.length || 0} مرض مسجل`
                            )}
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddClick}
                            sx={{
                                direction: 'rtl',
                            }}
                        >
                            &nbsp;
                            إضافة مرض
                        </Button>
                    </Box>
                </HeaderContainer>

                <DiseasesGrid
                    diseases={diseases || []}
                    isLoading={diseasesLoading}
                    error={diseasesError}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </StyledPaper>

            <DiseaseFormDialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                onSubmit={handleFormSubmit}
                disease={selectedDisease}
                plantId={plantId}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <DeleteDiseaseDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                disease={selectedDisease}
                isLoading={deleteMutation.isPending}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert dir='ltr' onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

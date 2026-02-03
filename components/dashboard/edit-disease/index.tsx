'use client';

import {
    Container,
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Alert,
    Snackbar,
    styled,
    Breadcrumbs,
    Link,
    Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { disease, diseaseDoc, diseaseDocData, diseaseDocElement } from '@/types/disease';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CollectionsIcon from '@mui/icons-material/Collections';
import ParagraphEditor from './ParagraphEditor';
import ImageEditor from './ImageEditor';
import ImagesGalleryEditor from './ImagesGalleryEditor';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

interface EditDiseasePageProps {
    diseaseId: string;
}

export default function EditDiseasePage({ diseaseId }: EditDiseasePageProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [content, setContent] = useState<diseaseDocElement[]>([]);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Fetch disease info
    const { data: disease, isLoading: diseaseLoading } = useQuery<disease>({
        queryKey: ['disease', diseaseId],
        queryFn: async () => {
            const response = await axios.get(`/api/diseases/${diseaseId}`);
            return response.data;
        },
    });

    // Fetch disease doc
    const { data: diseaseDoc, isLoading: docLoading } = useQuery<diseaseDoc>({
        queryKey: ['diseaseDoc', disease?.docId],
        queryFn: async () => {
            if (!disease?.docId) throw new Error('No doc ID');
            const response = await axios.get(`/api/disease-docs/${disease.docId}`);
            return response.data;
        },
        enabled: !!disease?.docId,
    });

    useEffect(() => {
        if (diseaseDoc?.content) {
            setContent(diseaseDoc.content);
        }
    }, [diseaseDoc]);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (data: diseaseDocData) => {
            if (!disease?.docId) throw new Error('No doc ID');
            const response = await axios.put(`/api/disease-docs/${disease.docId}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diseaseDoc', disease?.docId] });
            setSnackbar({ open: true, message: 'تم حفظ التغييرات بنجاح', severity: 'success' });
        },
        onError: () => {
            setSnackbar({ open: true, message: 'حدث خطأ أثناء الحفظ', severity: 'error' });
        },
    });

    const handleSave = () => {
        if (!disease) return;
        
        updateMutation.mutate({
            diseaseId: disease.id,
            content: content,
        });
    };

    const handleAddElement = (type: 'paragraph' | 'image' | 'diseasesImages') => {
        const newElement: diseaseDocElement = 
            type === 'paragraph' 
                ? { type: 'paragraph', title: '', paragraph: '' }
                : type === 'image'
                ? { type: 'image', url: '', altText: '', caption: '' }
                : { type: 'diseasesImages', title: '', images: [] };
        
        setContent([...content, newElement]);
    };

    const handleUpdateElement = (index: number, element: diseaseDocElement) => {
        const newContent = [...content];
        newContent[index] = element;
        setContent(newContent);
    };

    const handleDeleteElement = (index: number) => {
        setContent(content.filter((_, i) => i !== index));
    };

    const handleBreadcrumbClick = (path: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        router.push(path);
    };

    if (diseaseLoading || docLoading) {
        return (
            <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress size={60} />
            </Container>
        );
    }

    if (!disease) {
        return (
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ direction: 'rtl' }}>
                    <Typography sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}>
                        المرض غير موجود
                    </Typography>
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <StyledPaper>
                <HeaderContainer>
                    <Box sx={{ flex: 1 }}>
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
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
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
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                }}
                            >
                                النباتات
                            </Link>
                            <Typography
                                color="text.primary"
                                sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                            >
                                تعديل {disease.name}
                            </Typography>
                        </Breadcrumbs>

                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", "Amiri", sans-serif',
                            }}
                        >
                            تعديل وثيقة المرض: {disease.title}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={updateMutation.isPending}
                        sx={{
                            direction: 'rtl',
                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        }}
                    >
                        {updateMutation.isPending ? <CircularProgress size={24} /> : 'حفظ التغييرات'}
                    </Button>
                </HeaderContainer>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3, direction: 'rtl' }}>
                    <Button
                        variant="outlined"
                        startIcon={<TextFieldsIcon />}
                        onClick={() => handleAddElement('paragraph')}
                        sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                    >
                        إضافة فقرة
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ImageIcon />}
                        onClick={() => handleAddElement('image')}
                        sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                    >
                        إضافة صورة
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<CollectionsIcon />}
                        onClick={() => handleAddElement('diseasesImages')}
                        sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                    >
                        إضافة معرض صور
                    </Button>
                </Stack>

                <Stack spacing={3}>
                    {content.map((element, index) => (
                        <Box key={index}>
                            {element.type === 'paragraph' && (
                                <ParagraphEditor
                                    element={element}
                                    onSave={(updatedElement) => handleUpdateElement(index, updatedElement)}
                                    onDelete={() => handleDeleteElement(index)}
                                />
                            )}
                            
                            {element.type === 'image' && (
                                <ImageEditor
                                    element={element}
                                    onSave={(updatedElement) => handleUpdateElement(index, updatedElement)}
                                    onDelete={() => handleDeleteElement(index)}
                                />
                            )}
                            
                            {element.type === 'diseasesImages' && (
                                <ImagesGalleryEditor
                                    element={element}
                                    onSave={(updatedElement) => handleUpdateElement(index, updatedElement)}
                                    onDelete={() => handleDeleteElement(index)}
                                />
                            )}
                        </Box>
                    ))}

                    {content.length === 0 && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                textAlign: 'center',
                                backgroundColor: 'action.hover',
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                            >
                                لا توجد عناصر بعد. قم بإضافة عنصر للبدء.
                            </Typography>
                        </Paper>
                    )}
                </Stack>
            </StyledPaper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

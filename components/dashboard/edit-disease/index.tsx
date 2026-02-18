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
} from '@mui/material';
import Loading from '@/app/loading';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { diseaseDocBlock, diseaseDocData } from '@/types/disease';
import { useDiseaseDoc } from '@/hooks/useDiseaseDoc';
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Editor from './Editor';

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
    const { disease, diseaseDoc, isLoading, save, isSaving, saveError, saveSuccess } = useDiseaseDoc(diseaseId);
    const [content, setContent] = useState<diseaseDocData>();
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        if (diseaseDoc?.blocks) {
            setContent(diseaseDoc);
            console.log('Loaded content into editor:', diseaseDoc.blocks);
        }
    }, [diseaseDoc]);

    useEffect(() => {
        if (saveSuccess) {
            setSnackbar({ open: true, message: 'تم حفظ التغييرات بنجاح', severity: 'success' });
        }
    }, [saveSuccess]);

    useEffect(() => {
        if (saveError) {
            setSnackbar({ open: true, message: 'حدث خطأ أثناء الحفظ', severity: 'error' });
        }
    }, [saveError]);

    const handleSave = () => {
        if (!disease || !content) return;
        save(content);
    };


    const handleDocumentChange = (data: any) => {
        setContent(data);
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (!disease) {
        return (
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ direction: 'rtl' }}>
                    <Typography >
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
                                variant="body1"
                                href="/dashboard"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.secondary',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                لوحة التحكم
                            </Link>
                            <Link
                                variant="body1"
                                href={'/dashboard/plants'}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                النباتات
                            </Link>
                            <Typography
                                color="text.primary"
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
                            }}
                        >
                            تعديل وثيقة المرض: {disease.title}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={isSaving}
                        dir="ltr"
                    >
                        {isSaving ? <CircularProgress size={24} /> : 'حفظ التغييرات'}
                    </Button>
                </HeaderContainer>

                {content ? <Editor diseaseDoc={content} onChange={handleDocumentChange} /> : <Loading />}
            </StyledPaper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} dir='ltr' severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

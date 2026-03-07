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
    IconButton,
    Tooltip,
} from '@mui/material';
import CircularLoading from '@/components/CircularLoading';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { diseaseDocData } from '@/types/disease';
import { useDiseaseDoc } from '@/hooks/useDiseaseDoc';
import SaveIcon from '@mui/icons-material/Save';
import CustomBreadcrumbs from '@/components/shared/CustomBreadcrumbs';
import Editor from './Editor';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import Preview from './Preview';


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
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    textAlign: 'right',
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
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
    const [editMode, setEditMode] = useState<boolean>(true);

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
            <CircularLoading />
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

    const navigationLinks = [
        { label: 'لوحة التحكم', href: '/dashboard' },
        { label: 'النباتات', href: '/dashboard/plants' },
        { label: `تعديل ${disease.name}`, href: `/dashboard/diseases/${diseaseId}/edit` },
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <StyledPaper>
                <HeaderContainer>
                    <Box sx={{ flex: 1 }}>
                        <CustomBreadcrumbs items={navigationLinks} />

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

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            onClick={() => setEditMode(!editMode)}
                        >
                            <Tooltip title={editMode ? "عرض المرض" : "تعديل المرض"}>
                                {editMode ? <PreviewIcon /> : <EditIcon />}
                            </Tooltip>
                        </IconButton>

                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={isSaving}
                            dir="ltr"
                        >
                            {isSaving ? <CircularProgress size={24} /> : 'حفظ التغييرات'}
                        </Button>
                    </Box>
                </HeaderContainer>

                {content ? (
                    editMode ? 
                        <Editor diseaseDoc={content} onChange={handleDocumentChange} /> 
                    : 
                        <Preview data={{...content, id: disease.id}} />
                ) : (
                    <CircularLoading />
                )}
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

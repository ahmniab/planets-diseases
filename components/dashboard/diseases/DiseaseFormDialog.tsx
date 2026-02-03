'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
} from '@mui/material';
import { disease, diseaseSummary } from '@/types/disease';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('اسم المرض مطلوب'),
    title: yup.string().required('العنوان مطلوب'),
    plantId: yup.string().required('معرف النبات مطلوب'),
    mainImageUrl: yup.string().url('يجب إدخال رابط صحيح').required('رابط الصورة مطلوب'),
    docId: yup.string().optional().default(''),
});

interface DiseaseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: diseaseSummary) => void;
    disease?: disease | null;
    plantId: string;
    isLoading?: boolean;
}

export default function DiseaseFormDialog({
    open,
    onClose,
    onSubmit,
    disease,
    plantId,
    isLoading = false,
}: DiseaseFormDialogProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<diseaseSummary>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            title: '',
            plantId: plantId,
            mainImageUrl: '',
            docId: '',
        },
    });

    useEffect(() => {
        if (open) {
            if (disease) {
                reset({
                    name: disease.name,
                    title: disease.title,
                    plantId: disease.plantId,
                    mainImageUrl: disease.mainImageUrl,
                    docId: disease.docId,
                });
            } else {
                reset({
                    name: '',
                    title: '',
                    plantId: plantId,
                    mainImageUrl: '',
                    docId: '',
                });
            }
        }
    }, [disease, plantId, open, reset]);

    const onSubmitForm = (data: diseaseSummary) => {
        onSubmit(data);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    direction: 'rtl',
                }
            }}
        >
            <DialogTitle sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}>
                {disease ? 'تعديل المرض' : 'إضافة مرض جديد'}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="اسم المرض"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    InputProps={{
                                        sx: { direction: 'rtl' }
                                    }}
                                    InputLabelProps={{
                                        sx: { 
                                            right: 28,
                                            left: 'auto',
                                            transformOrigin: 'top right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                    FormHelperTextProps={{
                                        sx: {
                                            textAlign: 'right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="العنوان"
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    InputProps={{
                                        sx: { direction: 'rtl' }
                                    }}
                                    InputLabelProps={{
                                        sx: { 
                                            right: 28,
                                            left: 'auto',
                                            transformOrigin: 'top right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                    FormHelperTextProps={{
                                        sx: {
                                            textAlign: 'right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="mainImageUrl"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="رابط الصورة الرئيسية"
                                    fullWidth
                                    type="url"
                                    error={!!errors.mainImageUrl}
                                    helperText={errors.mainImageUrl?.message}
                                    InputProps={{
                                        sx: { direction: 'ltr' }
                                    }}
                                    InputLabelProps={{
                                        sx: { 
                                            right: 28,
                                            left: 'auto',
                                            transformOrigin: 'top right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                    FormHelperTextProps={{
                                        sx: {
                                            textAlign: 'right',
                                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                        }
                                    }}
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button 
                        onClick={onClose} 
                        disabled={isLoading}
                        sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                    >
                        إلغاء
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isLoading}
                        sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : disease ? 'حفظ' : 'إضافة'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

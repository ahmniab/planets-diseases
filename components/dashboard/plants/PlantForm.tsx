'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Avatar,
  Grid,
} from '@mui/material';
import { LocalFlorist, Save, Cancel } from '@mui/icons-material';
import { plantData } from '@/types/plant';

// Validation schema using Yup
const plantSchema = yup.object().shape({
  name: yup
    .string()
    .required('اسم النبات مطلوب')
    .min(2, 'يجب أن يكون اسم النبات على الأقل حرفين')
    .max(100, 'يجب أن لا يتجاوز اسم النبات 100 حرف'),
  imgUrl: yup
    .string()
    .required('رابط الصورة مطلوب')
    .url('يجب إدخال رابط صحيح للصورة'),
});

interface PlantFormProps {
  initialData?: plantData;
  onSubmit: (data: plantData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  title?: string;
}

const PlantForm: React.FC<PlantFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  title = 'إضافة نبات جديد',
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<plantData>({
    resolver: yupResolver(plantSchema),
    defaultValues: {
      name: initialData?.name || '',
      imgUrl: initialData?.imgUrl || '',
    },
    mode: 'onChange',
  });

  const watchedImgUrl = watch('imgUrl');

  const handleFormSubmit = async (data: plantData) => {
    try {
      data.name = data.name.trim();
      await onSubmit(data);
      if (!initialData) {
        reset(); // Reset form only for new plants
      }
    } catch (error) {
      console.error('Error submitting plant form:', error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      reset();
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LocalFlorist sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {initialData ? 'تعديل بيانات النبات' : 'أضف نبات جديد إلى قاعدة البيانات'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            {/* Plant Name Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    dir='ltr'
                    {...field}
                    fullWidth
                    label="اسم النبات"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading || isSubmitting}
                  />
                )}
              />
            </Grid>

            {/* Image URL Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="imgUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    dir='ltr'
                    {...field}
                    fullWidth
                    label="رابط صورة النبات"
                    variant="outlined"
                    error={!!errors.imgUrl}
                    helperText={errors.imgUrl?.message || 'أدخل رابط صورة واضحة للنبات'}
                    disabled={isLoading || isSubmitting}
                    placeholder="https://example.com/plant-image.jpg"
                  />
                )}
              />
            </Grid>

            {/* Image Preview */}
            {watchedImgUrl && (
              <Grid size={{ xs: 12 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    معاينة الصورة
                  </Typography>
                  <Avatar
                    src={watchedImgUrl}
                    alt="Plant Preview"
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 1,
                      border: '3px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <LocalFlorist sx={{ fontSize: 40 }} />
                  </Avatar>
                  {errors.imgUrl && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      تأكد من صحة رابط الصورة
                    </Alert>
                  )}
                </Box>
              </Grid>
            )}

            {/* Action Buttons */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading || isSubmitting || !isValid}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Save />
                    )
                  }
                  sx={{ 
                    minWidth: 120, 
                    py: 1.5, 
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  &nbsp;
                  {isSubmitting
                    ? 'جاري الحفظ...'
                    : initialData
                    ? 'تحديث النبات'
                    : 'حفظ النبات'
                  }
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  startIcon={<Cancel />}
                  sx={{ 
                    minWidth: 120, 
                    py: 1.5, 
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  &nbsp;إلغاء
                </Button>
              </Box>
            </Grid>

            {/* Help Text */}
            <Grid size={{ xs: 12 }}>
              <Alert severity="info" sx={{ textAlign: 'right' }}>
                <Typography variant="body2">
                  <strong>نصائح:</strong>
                  <br />
                  • استخدم اسماً واضحاً ومفهوماً للنبات
                  <br />
                  • تأكد من أن الصورة عالية الجودة وواضحة
                  <br />
                  • يفضل استخدام صور بخلفية بيضاء أو شفافة
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlantForm;

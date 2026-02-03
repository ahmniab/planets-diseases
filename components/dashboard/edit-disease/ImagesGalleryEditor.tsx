'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    Typography,
    Button,
    CardMedia,
    Card,
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CollectionsIcon from '@mui/icons-material/Collections';
import { diseasesImages } from '@/types/disease';

interface ImagesGalleryEditorProps {
    element: diseasesImages;
    onSave: (element: diseasesImages) => void;
    onDelete: () => void;
}

interface ImageInput {
    url: string;
    altText: string;
}

export default function ImagesGalleryEditor({ element, onSave, onDelete }: ImagesGalleryEditorProps) {
    const [isEditing, setIsEditing] = useState(!element.images || element.images.length === 0);
    const [title, setTitle] = useState(element.title || '');
    const [images, setImages] = useState<ImageInput[]>(
        element.images && element.images.length > 0
            ? element.images
            : [{ url: '', altText: '' }]
    );

    useEffect(() => {
        setTitle(element.title || '');
        setImages(
            element.images && element.images.length > 0
                ? element.images
                : [{ url: '', altText: '' }]
        );
    }, [element]);

    const handleSave = () => {
        const validImages = images.filter((img) => img.url.trim() && img.altText.trim());

        if (!title.trim() || validImages.length === 0) {
            return;
        }

        onSave({
            ...element,
            title: title.trim(),
            images: validImages.map((img) => ({
                url: img.url.trim(),
                altText: img.altText.trim(),
            })),
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (!element.images || element.images.length === 0) {
            onDelete();
        } else {
            setTitle(element.title || '');
            setImages(element.images);
            setIsEditing(false);
        }
    };

    const handleAddImage = () => {
        setImages([...images, { url: '', altText: '' }]);
    };

    const handleRemoveImage = (index: number) => {
        if (images.length > 1) {
            setImages(images.filter((_, i) => i !== index));
        }
    };

    const handleImageChange = (index: number, field: 'url' | 'altText', value: string) => {
        const newImages = [...images];
        newImages[index][field] = value;
        setImages(newImages);
    };

    if (!isEditing && element.images && element.images.length > 0) {
        return (
            <Paper
                elevation={2}
                onClick={() => setIsEditing(true)}
                sx={{
                    p: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)',
                    },
                    position: 'relative',
                    direction: 'rtl',
                }}
            >
                <IconButton
                    color="error"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>

                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", "Amiri", sans-serif',
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <CollectionsIcon />
                    {element.title}
                </Typography>

                <Grid container spacing={2}>
                    {element.images.map((image, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={image.url}
                                    alt={image.altText}
                                    sx={{
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        );
    }

    const validImages = images.filter((img) => img.url.trim() && img.altText.trim());
    const isValid = title.trim() && validImages.length > 0;

    return (
        <Paper elevation={3} sx={{ p: 3, direction: 'rtl' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <CollectionsIcon />
                    {element.images && element.images.length > 0 ? 'تعديل معرض الصور' : 'إضافة معرض صور جديد'}
                </Typography>
                <Box>
                    <IconButton color="primary" onClick={handleSave} disabled={!isValid}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCancel}>
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Box>

            <TextField
                fullWidth
                label="عنوان المعرض *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                error={!title.trim() && title !== ''}
                helperText={!title.trim() && title !== '' ? 'عنوان المعرض مطلوب' : ''}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-input': {
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        direction: 'rtl',
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        right: 28,
                        left: 'auto',
                    },
                    '& .MuiFormHelperText-root': {
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        textAlign: 'right',
                    },
                }}
            />

            <Box mb={2}>
                {images.map((image, index) => (
                    <Paper
                        key={index}
                        variant="outlined"
                        sx={{ p: 2, mb: 2, position: 'relative' }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                mb: 2,
                                fontWeight: 600,
                            }}
                        >
                            صورة {index + 1}
                        </Typography>

                        {images.length > 1 && (
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveImage(index)}
                                sx={{ position: 'absolute', top: 8, left: 8 }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}

                        <TextField
                            fullWidth
                            label="رابط الصورة *"
                            value={image.url}
                            onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                            required
                            sx={{
                                mb: 2,
                                '& .MuiInputBase-input': {
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                    direction: 'ltr',
                                    textAlign: 'left',
                                },
                                '& .MuiInputLabel-root': {
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                    right: 28,
                                    left: 'auto',
                                },
                            }}
                        />

                        {image.url && (
                            <Box sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    image={image.url}
                                    alt="معاينة"
                                    sx={{
                                        width: '100%',
                                        maxHeight: 200,
                                        objectFit: 'contain',
                                        backgroundColor: 'background.default',
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="النص البديل *"
                            value={image.altText}
                            onChange={(e) => handleImageChange(index, 'altText', e.target.value)}
                            required
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                    direction: 'rtl',
                                },
                                '& .MuiInputLabel-root': {
                                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                                    right: 28,
                                    left: 'auto',
                                },
                            }}
                        />
                    </Paper>
                ))}
            </Box>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={handleAddImage}
                sx={{
                    fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                    direction: 'rtl',
                }}
            >
                إضافة صورة
            </Button>

            {!isValid && images.length > 0 && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        display: 'block',
                        mt: 2,
                        textAlign: 'center',
                    }}
                >
                    يجب إضافة عنوان للمعرض وصورة واحدة على الأقل مع رابط ونص بديل
                </Typography>
            )}
        </Paper>
    );
}

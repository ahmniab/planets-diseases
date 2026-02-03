'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    Typography,
    CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import { imageDocElement } from '@/types/disease';

interface ImageEditorProps {
    element: imageDocElement;
    onSave: (element: imageDocElement) => void;
    onDelete: () => void;
}

export default function ImageEditor({ element, onSave, onDelete }: ImageEditorProps) {
    const [isEditing, setIsEditing] = useState(!element.url);
    const [url, setUrl] = useState(element.url || '');
    const [altText, setAltText] = useState(element.altText || '');
    const [caption, setCaption] = useState(element.caption || '');

    useEffect(() => {
        setUrl(element.url || '');
        setAltText(element.altText || '');
        setCaption(element.caption || '');
    }, [element]);

    const handleSave = () => {
        if (!url.trim() || !altText.trim()) {
            return;
        }

        onSave({
            ...element,
            url: url.trim(),
            altText: altText.trim(),
            caption: caption.trim() || undefined,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (!element.url) {
            onDelete();
        } else {
            setUrl(element.url || '');
            setAltText(element.altText || '');
            setCaption(element.caption || '');
            setIsEditing(false);
        }
    };

    if (!isEditing && element.url) {
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

                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: element.caption ? 2 : 0 }}>
                    <CardMedia
                        component="img"
                        image={element.url}
                        alt={element.altText}
                        sx={{
                            width: '100%',
                            maxHeight: 400,
                            objectFit: 'contain',
                            backgroundColor: 'background.default',
                        }}
                    />
                </Box>

                {element.caption && (
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                            textAlign: 'center',
                            color: 'text.secondary',
                            fontStyle: 'italic',
                        }}
                    >
                        {element.caption}
                    </Typography>
                )}
            </Paper>
        );
    }

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
                    <ImageIcon />
                    {element.url ? 'تعديل الصورة' : 'إضافة صورة جديدة'}
                </Typography>
                <Box>
                    <IconButton
                        color="primary"
                        onClick={handleSave}
                        disabled={!url.trim() || !altText.trim()}
                    >
                        <SaveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCancel}>
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Box>

            <TextField
                fullWidth
                label="رابط الصورة *"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                error={!url.trim() && url !== ''}
                helperText={!url.trim() && url !== '' ? 'رابط الصورة مطلوب' : ''}
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
                    '& .MuiFormHelperText-root': {
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        textAlign: 'right',
                    },
                }}
            />

            {url && (
                <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', backgroundColor: 'background.default' }}>
                    <CardMedia
                        component="img"
                        image={url}
                        alt="معاينة"
                        sx={{
                            width: '100%',
                            maxHeight: 300,
                            objectFit: 'contain',
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
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                required
                error={!altText.trim() && altText !== ''}
                helperText={
                    !altText.trim() && altText !== ''
                        ? 'النص البديل مطلوب'
                        : 'وصف مختصر للصورة لأغراض الوصول'
                }
                sx={{
                    mb: 2,
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

            <TextField
                fullWidth
                label="التعليق (اختياري)"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
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
    );
}

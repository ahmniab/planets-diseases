'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { paragraphDocElement } from '@/types/disease';

interface ParagraphEditorProps {
    element: paragraphDocElement;
    onSave: (element: paragraphDocElement) => void;
    onDelete: () => void;
}

export default function ParagraphEditor({ element, onSave, onDelete }: ParagraphEditorProps) {
    const [isEditing, setIsEditing] = useState(!element.paragraph);
    const [title, setTitle] = useState(element.title || '');
    const [paragraph, setParagraph] = useState(element.paragraph || '');

    useEffect(() => {
        setTitle(element.title || '');
        setParagraph(element.paragraph || '');
    }, [element]);

    const handleSave = () => {
        if (!paragraph.trim()) {
            return;
        }

        onSave({
            ...element,
            title: title.trim() || undefined,
            paragraph: paragraph.trim(),
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (!element.paragraph) {
            onDelete();
        } else {
            setTitle(element.title || '');
            setParagraph(element.paragraph || '');
            setIsEditing(false);
        }
    };

    if (!isEditing && element.paragraph) {
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
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>

                {element.title && (
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", "Amiri", sans-serif',
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 2,
                        }}
                    >
                        {element.title}
                    </Typography>
                )}

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", "Amiri", sans-serif',
                        lineHeight: 2,
                        fontSize: '1.1rem',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {element.paragraph}
                </Typography>
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
                    }}
                >
                    {element.paragraph ? 'تعديل الفقرة' : 'إضافة فقرة جديدة'}
                </Typography>
                <Box>
                    <IconButton color="primary" onClick={handleSave} disabled={!paragraph.trim()}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCancel}>
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Box>

            <TextField
                fullWidth
                label="العنوان (اختياري)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                }}
            />

            <TextField
                fullWidth
                multiline
                rows={8}
                label="محتوى الفقرة *"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                required
                error={!paragraph.trim() && paragraph !== ''}
                helperText={!paragraph.trim() && paragraph !== '' ? 'الفقرة مطلوبة' : ''}
                sx={{
                    '& .MuiInputBase-input': {
                        fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif',
                        direction: 'rtl',
                        lineHeight: 1.8,
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
        </Paper>
    );
}

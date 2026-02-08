'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { disease } from '@/types/disease';

interface DeleteDiseaseDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    disease: disease | null;
    isLoading?: boolean;
}

export default function DeleteDiseaseDialog({
    open,
    onClose,
    onConfirm,
    disease,
    isLoading = false,
}: DeleteDiseaseDialogProps) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    direction: 'rtl',
                }
            }}
        >
            <DialogTitle 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                }}
            >
                <WarningAmberIcon color="warning" />
                تأكيد الحذف
            </DialogTitle>
            <DialogContent>
                <Typography>
                    هل أنت متأكد من حذف المرض <strong>{disease?.name}</strong>؟
                    <br />
                    لا يمكن التراجع عن هذا الإجراء.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button 
                    onClick={onClose} 
                    disabled={isLoading}
                >
                    إلغاء
                </Button>
                <Button 
                    onClick={onConfirm} 
                    variant="contained" 
                    color="error"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'حذف'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

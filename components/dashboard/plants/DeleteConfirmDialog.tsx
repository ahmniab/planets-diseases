'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { plant } from '@/types/plant';

interface DeleteConfirmDialogProps {
  open: boolean;
  plant: plant | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmDialog = ({
  open,
  plant,
  onClose,
  onConfirm,
  loading = false
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { textAlign: 'center' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <WarningIcon color="error" sx={{ fontSize: 28 }} />
          <Typography variant="h6" component="span">
            تأكيد الحذف
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          هل أنت متأكد من حذف النبات؟
        </Typography>
        
        {plant && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: 'error.main',
              mb: 1
            }}
          >
            {plant.name}
          </Typography>
        )}
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          هذا الإجراء لا يمكن التراجع عنه وسيتم حذف جميع الأمراض المرتبطة بهذا النبات أيضاً.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          إلغاء
        </Button>
        
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? 'جاري الحذف...' : 'حذف'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
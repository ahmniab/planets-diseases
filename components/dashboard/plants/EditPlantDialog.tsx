'use client';

import { Dialog, DialogContent } from '@mui/material';
import { plant, plantData } from '@/types/plant';
import PlantForm from './PlantForm';

interface EditPlantDialogProps {
  open: boolean;
  plant: plant | undefined;
  onClose: () => void;
  onSave: (plantId: string, data: Partial<plantData>) => Promise<void>;
  loading?: boolean;
  title?: string;
}

const EditPlantDialog = ({
  open,
  plant,
  onClose,
  onSave,
  loading = false,
  title,
}: EditPlantDialogProps) => {
  const handleSubmit = async (data: plantData) => {
    console.log(onSave);
    await onSave('', data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      
    >
      <DialogContent sx={{ p: 0 }}>
        <PlantForm
          initialData={plant}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={loading}
          title={title}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPlantDialog;
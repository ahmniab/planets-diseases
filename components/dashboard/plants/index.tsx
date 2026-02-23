'use client';

import PlantCard from './PlantCard';
import EditPlantDialog from './EditPlantDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import PlantsGrid from './PlantsGrid';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { plant, plantData } from '@/types/plant';
import { 
    usePlants, 
    useUpdatePlant, 
    useDeletePlant,
    useCreatePlant
} from '@/hooks/usePlants';
import { getErrorMessage } from '@/lib/network';
import CustomBreadcrumbs from '@/components/shared/CustomBreadcrumbs';

type EditDialogState =  {
    open: boolean;
    plant?: plant;
    title?: string;
    onSave?: (plantId: string, data: Partial<plantData>) => Promise<void>;
    isNewPlant?: boolean;
    mutation?: any;
    pending: boolean;
  };

const PlantsAdminPage = () => {

  const navigationItems = [
    { label: 'لوحة التحكم', href: '/dashboard' },
    { label: 'إدارة النباتات' },
  ];
  
  // React Query hooks
  const { data: plants = [], isLoading, error, refetch } = usePlants();
  const updatePlantMutation = useUpdatePlant();
  const deletePlantMutation = useDeletePlant();
  const createPlantMutation = useCreatePlant();
  
  // Dialog states
  const [editDialog, setEditDialog] = useState<EditDialogState>({ 
        open: false, 
        plant: undefined, 
        title: undefined, 
        onSave: undefined, 
        isNewPlant: false,
        pending: false
    });
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    plant: plant | null;
  }>({ open: false, plant: null });

  // Handle edit plant
  const handleEditPlant = (plant: plant) => {
    setEditDialog({ 
        open: true, 
        plant, 
        title: "تحرير بيانات النبات", 
        onSave: handleSavePlant,
        pending: updatePlantMutation.isPending
    });
    console.log("Edit Plant dialog opened", editDialog);
  };

  // Handle save plant changes
  const handleSavePlant = async (plantId: string, data: Partial<plantData>) => {
    try {
      await updatePlantMutation.mutateAsync({ id: plantId, data });
      setEditDialog({ 
        open: false, 
        plant: undefined, 
        title: undefined, 
        onSave: undefined,
        pending: false
      });
    } catch (error) {
      console.error('Error updating plant:', error);
      throw error; // Re-throw to handle in dialog
    }
  };

  // Handle delete plant
  const handleDeletePlant = (plant: plant) => {
    setDeleteDialog({ open: true, plant });
  };

  // Confirm delete plant
  const handleConfirmDelete = async () => {
    if (!deleteDialog.plant) return;

    try {
      await deletePlantMutation.mutateAsync(deleteDialog.plant.id);
      setDeleteDialog({ open: false, plant: null });
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleCreatePlant = async (plantId: string, data: Partial<plantData>) => {
    console.log("handleCreatePlant invoked");
    console.log("Creating plant with data:", data);
    try {
        const plantData: plantData = data as plantData;
        console.log("Creating plant:", plantData);
        await createPlantMutation.mutateAsync(plantData);
        setEditDialog({ 
            open: false, 
            plant: undefined,
            title: undefined, 
            onSave: undefined,
            pending: createPlantMutation.isPending
    });
    } catch (error) {
      console.error('Error creating plant:', error);
      throw error; // Re-throw to handle in dialog
    }
  };

  const handleAddPlant = async () => {

    const NewditDialog: EditDialogState = {
        open: true,
        plant: undefined,
        title: "إضافة نبات جديد",
        onSave: handleCreatePlant,
        isNewPlant: true,
        pending: createPlantMutation.isPending
    };
    
    await setEditDialog(NewditDialog);
    console.log("Add Plant dialog opened", editDialog, NewditDialog);
  };

  const errorMessage = error ? getErrorMessage(error) : null;

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px' 
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <CustomBreadcrumbs items={navigationItems} />
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 4,
          mt: 2,
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              إدارة النباتات
            </Typography>
            <Typography variant="body1" color="text.secondary">
              إدارة جميع النباتات في النظام
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => refetch()}
              disabled={isLoading}
            >
                &nbsp;
              تحديث
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPlant}
              size="large"
            >
                &nbsp;
              إضافة نبات جديد
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Error Display */}
      {errorMessage && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              إعادة المحاولة
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      )}

      {/* Plants Grid */}
      <PlantsGrid
        plants={plants}
        onEditPlant={handleEditPlant}
        onDeletePlant={handleDeletePlant}
      />

      {/* Edit Plant Dialog */}
      <EditPlantDialog
        open={editDialog.open}
        plant={editDialog?.plant ?? undefined}
        onClose={() => setEditDialog({
            open: false, 
            plant: undefined,
            title: undefined, 
            onSave: undefined,
            isNewPlant: false,
            pending: false
        })}
        onSave={editDialog.onSave ?? (async (plantId, plantData) => { console.warn("onSave not defined"); })}
        loading={editDialog.pending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        plant={deleteDialog.plant}
        onClose={() => setDeleteDialog({ open: false, plant: null })}
        onConfirm={handleConfirmDelete}
        loading={deletePlantMutation.isPending}
      />
    </Container>
  );
};

export default PlantsAdminPage;
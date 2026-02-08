import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { plant, plantData } from '@/types/plant';
import { plantService } from '@/lib/network';
import { handleApiError } from '@/lib/network';

// Query keys
export const plantKeys = {
  all: ['plants'] as const,
  lists: () => [...plantKeys.all, 'list'] as const,
  list: (filters: string) => [...plantKeys.lists(), { filters }] as const,
  details: () => [...plantKeys.all, 'detail'] as const,
  detail: (id: string) => [...plantKeys.details(), id] as const,
};

// Get all plants
export const usePlants = () => {
  return useQuery({
    queryKey: plantKeys.lists(),
    queryFn: () => plantService.getAllPlants(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single plant
export const usePlant = (id: string) => {
  return useQuery({
    queryKey: plantKeys.detail(id),
    queryFn: () => plantService.getPlantById(id),
    enabled: !!id,
  });
};

// Create plant mutation
export const useCreatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: plantData) => plantService.createPlant(data),
    onSuccess: (newPlant) => {
      // Invalidate and refetch plants list
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
      
      // Optionally add the new plant to the cache
      queryClient.setQueryData(plantKeys.detail(newPlant.id), newPlant);
    },
    onError: (error) => {
      console.error('Create plant error:', handleApiError(error));
    },
  });
};

// Update plant mutation
export const useUpdatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<plantData> }) =>
      plantService.updatePlant(id, data),
    onSuccess: (updatedPlant) => {
      // Update the plant in the cache
      queryClient.setQueryData(plantKeys.detail(updatedPlant.id), updatedPlant);
      
      // Invalidate plants list to ensure consistency
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
    },
    onError: (error) => {
      console.error('Update plant error:', handleApiError(error));
    },
  });
};

// Delete plant mutation
export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => plantService.deletePlant(id),
    onSuccess: (_, deletedId) => {
      // Remove plant from cache
      queryClient.removeQueries({ queryKey: plantKeys.detail(deletedId) });
      
      // Invalidate plants list
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
    },
    onError: (error) => {
      console.error('Delete plant error:', handleApiError(error));
    },
  });
};
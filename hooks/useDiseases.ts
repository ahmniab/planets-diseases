import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { disease, diseaseSummary } from '@/models/disease';
import { diseaseService } from '@/libs/network/diseaseService';

// Query keys
export const diseaseKeys = {
    all: ['diseases'] as const,
    byPlant: (plantId: string) => [...diseaseKeys.all, 'plant', plantId] as const,
};

// Hook to fetch diseases for a specific plant
export function usePlantDiseases(plantId: string) {
    return useQuery<disease[], Error>({
        queryKey: diseaseKeys.byPlant(plantId),
        queryFn: () => diseaseService.getPlantDiseases(plantId),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Hook to create a new disease
export function useCreateDisease(plantId: string) {
    const queryClient = useQueryClient();

    return useMutation<disease, Error, diseaseSummary>({
        mutationFn: (diseaseData: diseaseSummary) => diseaseService.createDisease(diseaseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: diseaseKeys.byPlant(plantId) });
        },
    });
}

// Hook to update a disease
export function useUpdateDisease(plantId: string) {
    const queryClient = useQueryClient();

    return useMutation<disease, Error, { id: string; data: Partial<diseaseSummary> }>({
        mutationFn: ({ id, data }) => diseaseService.updateDisease(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: diseaseKeys.byPlant(plantId) });
        },
    });
}

// Hook to delete a disease
export function useDeleteDisease(plantId: string) {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => diseaseService.deleteDisease(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: diseaseKeys.byPlant(plantId) });
        },
    });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { disease, diseaseDoc, diseaseDocData } from '@/types/disease';
import apiClient from '@/lib/network/apiClient';

// Query keys
export const diseaseDocKeys = {
    all: ['diseaseDoc'] as const,
    byId: (docId: string) => [...diseaseDocKeys.all, docId] as const,
    disease: (diseaseId: string) => ['disease', diseaseId] as const,
};

export function useDiseaseDoc(diseaseId: string) {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const getIdToken = async (): Promise<string> => {
        if (!user) throw new Error('User is not authenticated');
        return user.getIdToken();
    };

    // Fetch disease info
    const diseaseQuery = useQuery<disease>({
        queryKey: diseaseDocKeys.disease(diseaseId),
        queryFn: async () => {
            const response = await apiClient.get<disease>(`/diseases/${diseaseId}`);
            return response.data;
        },
    });

    const docId = diseaseQuery.data?.docId;

    // Fetch disease doc
    const docQuery = useQuery<diseaseDoc>({
        queryKey: diseaseDocKeys.byId(docId!),
        queryFn: async () => {
            const response = await apiClient.get<diseaseDoc>(`/disease-docs/${docId}`);
            return response.data;
        },
        enabled: !!docId,
    });

    // Update mutation
    const updateMutation = useMutation<diseaseDoc, Error, diseaseDocData>({
        mutationFn: async (data: diseaseDocData) => {
            if (!docId) throw new Error('No doc ID');
            const idToken = await getIdToken();
            const response = await apiClient.put<diseaseDoc>(
                `/disease-docs/${docId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            if (docId) {
                queryClient.invalidateQueries({ queryKey: diseaseDocKeys.byId(docId) });
            }
        },
    });

    return {
        disease: diseaseQuery.data,
        diseaseDoc: docQuery.data,
        isLoading: diseaseQuery.isLoading || docQuery.isLoading,
        save: updateMutation.mutate,
        isSaving: updateMutation.isPending,
        saveError: updateMutation.error,
        saveSuccess: updateMutation.isSuccess,
    };
}

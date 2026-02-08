import { disease, diseaseSummary } from '@/types/disease';
import apiClient from './apiClient';

export interface DiseaseServiceInterface {
    getPlantDiseases: (plantId: string) => Promise<disease[]>;
    createDisease: (diseaseData: diseaseSummary) => Promise<disease>;
    updateDisease: (id: string, diseaseData: Partial<diseaseSummary>) => Promise<disease>;
    deleteDisease: (id: string) => Promise<void>;
}

class DiseaseService implements DiseaseServiceInterface {
    async getPlantDiseases(plantId: string): Promise<disease[]> {
        const response = await apiClient.get<disease[]>(`/plants/${plantId}/diseases`);
        return response.data;
    }

    async createDisease(diseaseData: diseaseSummary): Promise<disease> {
        const response = await apiClient.post<disease>('/diseases', diseaseData);
        return response.data;
    }

    async updateDisease(id: string, diseaseData: Partial<diseaseSummary>): Promise<disease> {
        const response = await apiClient.put<disease>(`/diseases/${id}`, diseaseData);
        return response.data;
    }

    async deleteDisease(id: string): Promise<void> {
        await apiClient.delete(`/diseases/${id}`);
    }
}

export const diseaseService = new DiseaseService();

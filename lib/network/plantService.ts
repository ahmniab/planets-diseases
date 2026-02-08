import { plant, plantData } from '@/types/plant';
import apiClient from './apiClient';

export interface PlantServiceInterface {
  getAllPlants: () => Promise<plant[]>;
  getPlantById: (id: string) => Promise<plant>;
  createPlant: (data: plantData) => Promise<plant>;
  updatePlant: (id: string, data: Partial<plantData>) => Promise<plant>;
  deletePlant: (id: string) => Promise<void>;
}

class PlantService implements PlantServiceInterface {
  async getAllPlants(): Promise<plant[]> {
    try {
      const response = await apiClient.get<plant[]>('/plants');
      return response.data;
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw new Error('فشل في تحميل النباتات');
    }
  }

  async getPlantById(id: string): Promise<plant> {
    try {
      const response = await apiClient.get<plant>(`/plants/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching plant:', error);
      throw new Error('فشل في تحميل النبات');
    }
  }

  async createPlant(data: plantData): Promise<plant> {
    try {
      const response = await apiClient.post<plant>('/plants/add', data);
      return response.data;
    } catch (error) {
      console.error('Error creating plant:', error);
      throw new Error('فشل في إضافة النبات');
    }
  }

  async updatePlant(id: string, data: Partial<plantData>): Promise<plant> {
    try {
      const response = await apiClient.put<plant>(`/plants/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating plant:', error);
      throw new Error('فشل في تحديث النبات');
    }
  }

  async deletePlant(id: string): Promise<void> {
    try {
      await apiClient.delete(`/plants/${id}`);
    } catch (error) {
      console.error('Error deleting plant:', error);
      throw new Error('فشل في حذف النبات');
    }
  }
}

// Export singleton instance
export const plantService = new PlantService();
export default plantService;
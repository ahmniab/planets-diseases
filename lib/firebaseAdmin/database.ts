import { db } from "./firebase";
import { plantData, plant } from "@/types/plant";
import { disease, diseaseSummary, diseaseDoc, diseaseDocData } from "@/types/disease";

export const addPlant = async (plantData: plantData): Promise<plant> => {
    const newPlantdoc = await db.collection('plants').add(plantData);
    if (!newPlantdoc) {
        throw new Error('Failed to add plant');
    }
    const newPlant: plant = {
        id: newPlantdoc.id,
        ...plantData
    };
    return newPlant;
}
export const getPlantById = async (plantId: string): Promise<plant | null> => {
    const plantDoc = await db.collection('plants').doc(plantId).get();
    if (!plantDoc.exists) {
        return null;
    }
    const plantData = plantDoc.data() as plantData;
    const plant: plant = {
        id: plantDoc.id,
        ...plantData
    };
    return plant;
}

export const getAllPlants = async (query?: string, page: number = 1, limit: number = 10): Promise<plant[]> => {
    let snapshot;
    if (query && query !== "") {
        snapshot = await db.collection('plants').where('name', '>=', query).where('name', '<=', query + '\uf8ff').limit(limit).offset((page - 1) * limit).get();
    } else {
        snapshot = await db.collection('plants').limit(limit).offset((page - 1) * limit).get();
    }
    const plants: plant[] = [];
    snapshot.forEach(doc => {
        const data = doc.data() as plantData;
        plants.push({
            id: doc.id,
            ...data
        });
    });
    return plants;
}

export const getAllPlantsCount = async (query?: string): Promise<number> => {
  const baseQuery = db.collection('plants');
  
  const finalQuery = query && query !== ""
    ? baseQuery.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
    : baseQuery;
  
  const snapshot = await finalQuery.count().get();
  return snapshot.data().count;
}

export const updatePlant = async (plantId: string, plantData: Partial<plantData>): Promise<plant> => {
    console.log("Updating plant with data:", plantData);
    console.log("Plant ID:", plantId);
    await db.collection('plants').doc(plantId).update(plantData);
    const updatedPlantDoc = await db.collection('plants').doc(plantId).get();
    const updatedPlantData = updatedPlantDoc.data() as plantData;
    const updatedPlant: plant = {
        id: updatedPlantDoc.id,
        ...updatedPlantData
    };
    return updatedPlant;
}

export const deletePlant = async (plantId: string): Promise<void> => {
    await db.collection('plants').doc(plantId).delete();
}

export const getPlantDiseases = async (plantId: string): Promise<disease[]> => {
    const diseases = await db.collection('diseases')
                             .where('plantId', '==', plantId)
                             .get();

    const diseaseList: disease[] = [];
    diseases.forEach(doc => {
        const data = doc.data() as diseaseSummary;
        diseaseList.push({
            id: doc.id,
            ...data
        });
    });
    return diseaseList;
}

export const addDisease = async (diseaseData: diseaseSummary): Promise<disease> => {
    const newDiseaseDoc = await db.collection('diseases').add(diseaseData);
    if (!newDiseaseDoc) {
        throw new Error('Failed to add disease');
    }
    const newDisease: disease = {
        id: newDiseaseDoc.id,
        ...diseaseData
    };
    return newDisease;
}

export const updateDisease = async (diseaseId: string, diseaseData: Partial<diseaseSummary>): Promise<disease> => {
    await db.collection('diseases').doc(diseaseId).update(diseaseData);
    const updatedDiseaseDoc = await db.collection('diseases').doc(diseaseId).get();
    const updatedDiseaseData = updatedDiseaseDoc.data() as diseaseSummary;
    const updatedDisease: disease = {
        id: updatedDiseaseDoc.id,
        ...updatedDiseaseData
    };
    return updatedDisease;
}

export const getDiseaseById = async (diseaseId: string): Promise<disease | null> => {
    const diseaseDoc = await db.collection('diseases').doc(diseaseId).get();
    if (!diseaseDoc.exists) {
        return null;
    }
    const diseaseData = diseaseDoc.data() as diseaseSummary;
    return {
        id: diseaseDoc.id,
        ...diseaseData
    };
}

export const deleteDisease = async (diseaseId: string): Promise<void> => {
    // First delete the associated disease doc if it exists
    const diseaseDoc = await db.collection('diseases').doc(diseaseId).get();
    if (diseaseDoc.exists) {
        const diseaseData = diseaseDoc.data() as diseaseSummary;
        if (diseaseData.docId) {
            await deleteDiseaseDoc(diseaseData.docId);
        }
    }
    // Then delete the disease itself
    await db.collection('diseases').doc(diseaseId).delete();
}

export const getDiseaseDocById = async (diseaseDocId: string): Promise<diseaseDoc | null> => {
    const diseaseDocSnap = await db.collection('diseaseDocs').doc(diseaseDocId).get();
    if (!diseaseDocSnap.exists) {
        return null;
    }
    const diseaseDocData = diseaseDocSnap.data() as any;
    
    // Deserialize blocks if they're stored as JSON string
    const diseaseDoc: diseaseDoc = {
        id: diseaseDocSnap.id,
        ...diseaseDocData,
        blocks: typeof diseaseDocData.blocks === 'string' ? JSON.parse(diseaseDocData.blocks) : diseaseDocData.blocks
    };
    return diseaseDoc;
}

export const getDiseaseDocByDiseaseId = async (diseaseId: string): Promise<diseaseDoc | null> => {
    // First get the disease to find its docId
    const diseaseSnap = await db.collection('diseases').doc(diseaseId).get();
    if (!diseaseSnap.exists) {
        return null;
    }
    
    const diseaseData = diseaseSnap.data() as diseaseSummary;
    if (!diseaseData.docId) {
        return null;
    }
    
    // Then fetch the disease doc using the docId
    return getDiseaseDocById(diseaseData.docId);
}
export const addDiseaseDoc = async (diseaseDocData: diseaseDocData): Promise<diseaseDoc> => {
    // Serialize blocks to JSON string to avoid Firebase nested array/object restrictions
    const serializedData = {
        ...diseaseDocData,
        blocks: JSON.stringify(diseaseDocData.blocks)
    };
    
    const newDiseaseDocRef = await db.collection('diseaseDocs').add(serializedData);
    
    const newDiseaseDoc: diseaseDoc = {
        id: newDiseaseDocRef.id,
        ...diseaseDocData as diseaseDocData
    };
    return newDiseaseDoc;
}

export const updateDiseaseDoc = async (diseaseDoc: diseaseDoc): Promise<diseaseDoc> => {
    const { id, ...dataToUpdate } = diseaseDoc;
    
    // Serialize blocks to JSON string to avoid Firebase nested array/object restrictions
    const serializedData = {
        ...dataToUpdate,
        blocks: JSON.stringify(dataToUpdate.blocks)
    };
    
    await db.collection('diseaseDocs').doc(id).update(serializedData);
    const updatedDiseaseDoc = await db.collection('diseaseDocs').doc(id).get();
    const docData = updatedDiseaseDoc.data() as any;
    
    // Deserialize blocks back from JSON string
    return {
        id: updatedDiseaseDoc.id,
        ...docData,
        blocks: typeof docData.blocks === 'string' ? JSON.parse(docData.blocks) : docData.blocks
    };
}

export const deleteDiseaseDoc = async (diseaseDocId: string): Promise<void> => {
    await db.collection('diseaseDocs').doc(diseaseDocId).delete();
}

export const deleteDiseasesByPlantId = async (plantId: string): Promise<void> => {
    const diseases = await getPlantDiseases(plantId);
    if (!diseases.length) {
        return;
    }
    const batch = db.batch();
    diseases.forEach(async disease => {
        if (disease.docId) await deleteDiseaseDoc(disease.docId);
        const diseaseRef = db.collection('diseases').doc(disease.id);
        batch.delete(diseaseRef);
    });
    await batch.commit();

}

export const deleteDiseaseDocByDiseaseId = async (diseaseId: string): Promise<void> => {
    const disease = await db.collection('diseases').doc(diseaseId).get();
    if (disease.exists) {
        const diseaseData = disease.data() as disease;
        const diseaseDocId = diseaseData.docId;
        if (diseaseDocId) {
            await db.collection('diseaseDocs').doc(diseaseDocId).delete();
        }  
    }
    throw new Error('Disease not found');
}

export const diseaseCount = async (): Promise<number> => {
    const snapshot = await db.collection('diseases').get();
    return snapshot.size;
}

export const plantCount = async (): Promise<number> => {
    const snapshot = await db.collection('plants').get();
    return snapshot.size;
}
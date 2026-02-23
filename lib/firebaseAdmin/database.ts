import { db } from "./firebase";
import { plantData, plant } from "@/types/plant";
import { disease, diseaseSummary, diseaseDoc, diseaseDocData } from "@/types/disease";
import { setKey, getKey, isRedisEnabled, redisKeys, invalidatePlantCaches, invalidatePlantDiseasesCaches, invalidateDiseaseDocCaches } from "../redis";

export const addPlant = async (plantData: plantData): Promise<plant> => {
    const newPlantdoc = await db.collection('plants').add(plantData);
    if (!newPlantdoc) {
        throw new Error('Failed to add plant');
    }
    const newPlant: plant = {
        id: newPlantdoc.id,
        ...plantData
    };
    await invalidatePlantCaches();
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
    const cacheKey = redisKeys.allPlants(query, page, limit);
    if (isRedisEnabled()) {
        const cachedPlants = await getKey(cacheKey);
        if (cachedPlants !== null) {
            return JSON.parse(cachedPlants);
        }
    }
    
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
    
    if (isRedisEnabled()) {
        await setKey(cacheKey, JSON.stringify(plants));
    }
    
    return plants;
}

export const getAllPlantsCount = async (query?: string): Promise<number> => {
    const cacheKey = redisKeys.plantsCount(query);
    if (isRedisEnabled() && query) {
        const cachedCount = await getKey(cacheKey);
        if (cachedCount !== null) {
            return parseInt(cachedCount, 10);
        }
    }
    const baseQuery = db.collection('plants');
    
    const finalQuery = query && query !== ""
        ? baseQuery.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
        : baseQuery;
    
    const snapshot = await finalQuery.count().get();
    const count = snapshot.data().count;
    if (isRedisEnabled() && query) {
        await setKey(cacheKey, count.toString());
    }
    return count;
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
    await invalidatePlantCaches();
    return updatedPlant;
}

export const deletePlant = async (plantId: string): Promise<void> => {
    await db.collection('plants').doc(plantId).delete();
    await invalidatePlantCaches();
    await invalidatePlantDiseasesCaches(plantId);
}

export const getPlantDiseases = 
    async (plantId: string, query?: string, page: number = 1, limit: number = 10): 
    Promise<disease[]> => 
{
    const cacheKey = redisKeys.plantDiseases(plantId, query, page, limit);
    if (isRedisEnabled()) {
        const cachedDiseases = await getKey(cacheKey);
        if (cachedDiseases !== null) {
            return JSON.parse(cachedDiseases);
        }
    }
    
    let diseasesQuery = db.collection('diseases').where('plantId', '==', plantId);
    
    if (query && query !== "") {
        console.log("Applying search filter to diseases query with query:", query);
        diseasesQuery = diseasesQuery.where('name', '>=', query)
            .where('name', '<=', query + '\uf8ff').orderBy("name");
    }

    const diseases = await diseasesQuery.limit(limit).offset((page - 1) * limit).get();

    const diseaseList: disease[] = [];
    diseases.forEach(doc => {
        const data = doc.data() as diseaseSummary;
        diseaseList.push({
            id: doc.id,
            ...data
        });
    });
    
    if (isRedisEnabled()) {
        await setKey(cacheKey, JSON.stringify(diseaseList));
    }
    
    return diseaseList;
}

export const getPlantDiseasesCount = async (plantId: string, query?: string): Promise<number> => {
    const cacheKey = redisKeys.plantDiseasesCount(plantId, query);
    if (isRedisEnabled()) {
        const cachedCount = await getKey(cacheKey);
        if (cachedCount !== null) {
            return parseInt(cachedCount, 10);
        }
    }
    
    let diseasesQuery = db.collection('diseases').where('plantId', '==', plantId);
    
    if (query && query !== "") {
        diseasesQuery = diseasesQuery.where('name', '>=', query).where('name', '<=', query + '\uf8ff');
    }

    const snapshot = await diseasesQuery.count().get();
    const count = snapshot.data().count;
    
    if (isRedisEnabled()) {
        await setKey(cacheKey, count.toString());
    }
    
    return count;
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
    await invalidatePlantDiseasesCaches(diseaseData.plantId);
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
    await invalidatePlantDiseasesCaches(updatedDiseaseData.plantId);
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
        await invalidatePlantDiseasesCaches(diseaseData.plantId);
        await invalidateDiseaseDocCaches(diseaseData.docId, diseaseId);
    }
    // Then delete the disease itself
    await db.collection('diseases').doc(diseaseId).delete();
}

export const getDiseaseDocById = async (diseaseDocId: string): Promise<diseaseDoc | null> => {
    const cacheKey = redisKeys.diseaseDoc(diseaseDocId);
    if (isRedisEnabled()) {
        const cachedDoc = await getKey(cacheKey);
        if (cachedDoc !== null) {
            return JSON.parse(cachedDoc);
        }
    }
    
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
    
    if (isRedisEnabled()) {
        await setKey(cacheKey, JSON.stringify(diseaseDoc));
    }
    
    return diseaseDoc;
}

export const getDiseaseDocByDiseaseId = async (diseaseId: string): Promise<diseaseDoc | null> => {
    const cacheKey = redisKeys.diseaseDocByDiseaseId(diseaseId);
    if (isRedisEnabled()) {
        const cachedDoc = await getKey(cacheKey);
        if (cachedDoc !== null) {
            return JSON.parse(cachedDoc);
        }
    }
    
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
    const diseaseDoc = await getDiseaseDocById(diseaseData.docId);
    
    if (isRedisEnabled() && diseaseDoc !== null) {
        await setKey(cacheKey, JSON.stringify(diseaseDoc));
    }
    
    return diseaseDoc;
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
    await invalidateDiseaseDocCaches(newDiseaseDocRef.id);
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
    
    // Invalidate cache for this disease doc
    await invalidateDiseaseDocCaches(id);
    
    // Also need to invalidate the diseaseId cache - find which disease references this doc
    const diseaseQuery = await db.collection('diseases').where('docId', '==', id).limit(1).get();
    if (!diseaseQuery.empty) {
        const diseaseId = diseaseQuery.docs[0].id;
        await invalidateDiseaseDocCaches(undefined, diseaseId);
    }
    
    // Deserialize blocks back from JSON string
    return {
        id: updatedDiseaseDoc.id,
        ...docData,
        blocks: typeof docData.blocks === 'string' ? JSON.parse(docData.blocks) : docData.blocks
    };
}

export const deleteDiseaseDoc = async (diseaseDocId: string): Promise<void> => {
    // Find which disease references this doc to invalidate both caches
    const diseaseQuery = await db.collection('diseases').where('docId', '==', diseaseDocId).limit(1).get();
    let diseaseId: string | undefined;
    if (!diseaseQuery.empty) {
        diseaseId = diseaseQuery.docs[0].id;
    }
    
    await db.collection('diseaseDocs').doc(diseaseDocId).delete();
    await invalidateDiseaseDocCaches(diseaseDocId, diseaseId);
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
    await invalidatePlantDiseasesCaches(plantId);

}

export const deleteDiseaseDocByDiseaseId = async (diseaseId: string): Promise<void> => {
    const disease = await db.collection('diseases').doc(diseaseId).get();
    if (disease.exists) {
        const diseaseData = disease.data() as disease;
        const diseaseDocId = diseaseData.docId;
        if (diseaseDocId) {
            await db.collection('diseaseDocs').doc(diseaseDocId).delete();
            await invalidateDiseaseDocCaches(diseaseDocId, diseaseId);
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
import { 
    addDisease,
    addDiseaseDoc,
    updateDisease,
} from "@/lib/firebaseAdmin/database";
import { diseaseDoc, diseaseDocData, diseaseSummary } from "@/types/disease";
import { requireAuth } from "@/lib/firebaseAdmin/auth";

export async function POST(request: Request) {
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
        return authResult;
    }
    
    try {
        const data: diseaseSummary = await request.json();
        const newDisease = await addDisease(data);
        const newDiseaseDoc = await addDiseaseDoc({
            diseaseId: newDisease.id,
            blocks: [],
        } as diseaseDocData); 
        console.log("New disease document created: ", newDiseaseDoc);
        newDisease.docId = newDiseaseDoc.id;
        await updateDisease(newDisease.id, newDisease);
        return Response.json(newDisease, { status: 201 });
    } catch (error) {
        console.error("Error creating disease:", error);
        return Response.json(
            { error: "Failed to create disease" },
            { status: 500 }
        );
    }
}

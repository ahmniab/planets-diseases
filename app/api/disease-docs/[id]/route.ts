import { getDiseaseDocById, updateDiseaseDoc } from "@/lib/firebaseAdmin/database";
import { diseaseDocData } from "@/types/disease";
import { requireAuth } from "@/lib/firebaseAdmin/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const diseaseDoc = await getDiseaseDocById(id);
        
        if (!diseaseDoc) {
            return Response.json(
                { error: "Disease document not found" },
                { status: 404 }
            );
        }
        
        return Response.json(diseaseDoc, { status: 200 });
    } catch (error) {
        console.error("Error fetching disease document:", error);
        return Response.json(
            { error: "Failed to fetch disease document" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
        return authResult;
    }
    
    try {
        const { id } = await params;
        const data: diseaseDocData = await request.json();
        
        const updatedDoc = await updateDiseaseDoc({ id, ...data });
        return Response.json(updatedDoc, { status: 200 });
    } catch (error) {
        console.error("Error updating disease document:", error);
        return Response.json(
            { error: "Failed to update disease document" },
            { status: 500 }
        );
    }
}

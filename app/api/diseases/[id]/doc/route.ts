import { getDiseaseDocByDiseaseId } from "@/lib/firebaseAdmin/database";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const diseaseDoc = await getDiseaseDocByDiseaseId(id);
        
        if (!diseaseDoc) {
            return Response.json(
                { error: "Disease document not found" },
                { status: 404 }
            );
        }
        
        return Response.json(diseaseDoc, { status: 200 });
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch disease document" },
            { status: 500 }
        );
    }
}

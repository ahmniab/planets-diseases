import { getPlantDiseases } from "@/libs/firebase-admin/database";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const diseases = await getPlantDiseases(id);
        return Response.json(diseases, { status: 200 });
    } catch (error) {
        console.error("Error fetching diseases:", error);
        return Response.json(
            { error: "Failed to fetch diseases" },
            { status: 500 }
        );
    }
}

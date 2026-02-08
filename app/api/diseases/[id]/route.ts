import { getDiseaseById, updateDisease, deleteDisease } from "@/lib/firebaseAdmin/database";
import { diseaseSummary } from "@/types/disease";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const disease = await getDiseaseById(id);
        
        if (!disease) {
            return Response.json(
                { error: "Disease not found" },
                { status: 404 }
            );
        }
        
        return Response.json(disease, { status: 200 });
    } catch (error) {
        console.error("Error fetching disease:", error);
        return Response.json(
            { error: "Failed to fetch disease" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data: Partial<diseaseSummary> = await request.json();
        const updatedDisease = await updateDisease(id, data);
        return Response.json(updatedDisease, { status: 200 });
    } catch (error) {
        console.error("Error updating disease:", error);
        return Response.json(
            { error: "Failed to update disease" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await deleteDisease(id);
        return Response.json(
            { message: "Disease deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting disease:", error);
        return Response.json(
            { error: "Failed to delete disease" },
            { status: 500 }
        );
    }
}

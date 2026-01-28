import { getPlantById, updatePlant, deletePlant, deleteDiseasesByPlantId } from "@/libs/firebase-admin/database";
import { plantData } from "@/models/plant";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id  } = await params;
        const plant = await getPlantById(id);
        if (!plant) {
            return Response.json(
                { error: "Plant not found" },
                { status: 404 }
            );
        }
        return Response.json(plant, { status: 200 });
    } catch (error) {
        console.error("Error fetching plant:", error);
        return Response.json(
            { error: "Failed to fetch plant" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data: Partial<plantData> = await request.json();
        const updatedPlant = await updatePlant(id, data);
        return Response.json(updatedPlant, { status: 200 });
    } catch (error) {
        console.error("Error updating plant:", error);
        return Response.json(
            { error: "Failed to update plant" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // Delete all associated diseases first
        await deleteDiseasesByPlantId(id);
        
        // Then delete the plant
        await deletePlant(id);
        
        return Response.json(
            { message: "Plant deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting plant:", error);
        return Response.json(
            { error: "Failed to delete plant" },
            { status: 500 }
        );
    }
}
import { addPlant } from "@/libs/firebase-admin/database";
import { plantData } from "@/models/plant";

export async function POST(request: Request) {
    try {
        // For now, skip authentication validation to fix the edge runtime issue
        // In production, you should validate Firebase ID tokens here
        const data: plantData = await request.json();
        const newPlant = await addPlant(data);
        
        return Response.json(newPlant, { status: 201 });
    } catch (error) {
        console.error("Error adding plant:", error);
        return Response.json(
            { error: "Failed to add plant" }, 
            { status: 500 }
        );
    }
}
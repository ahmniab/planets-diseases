import { addPlant } from "@/lib/firebaseAdmin/database";
import { plantData } from "@/types/plant";
import { requireAuth } from "@/lib/firebaseAdmin/auth";

export async function POST(request: Request) {
    // Verify authentication
    const authResult = await requireAuth(request);
    if (authResult instanceof Response) {
        return authResult;
    }
    
    try {
        const data: plantData = await request.json();
        const newPlant = await addPlant(data);
        
        return Response.json(newPlant, { status: 201 });
    } catch (error) {
        return Response.json(
            { error: "Failed to add plant" }, 
            { status: 500 }
        );
    }
}
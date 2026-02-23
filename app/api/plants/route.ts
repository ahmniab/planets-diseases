import { getAllPlants } from "@/lib/firebaseAdmin/database";

export async function GET() {
    try {
        const plants = await getAllPlants();
        return Response.json(plants, { status: 200 });
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch plants" }, 
            { status: 500 }
        );
    }
}
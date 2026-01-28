import { addDisease } from "@/libs/firebase-admin/database";
import { diseaseSummary } from "@/models/disease";

export async function POST(request: Request) {
    try {
        const data: diseaseSummary = await request.json();
        const newDisease = await addDisease(data);
        return Response.json(newDisease, { status: 201 });
    } catch (error) {
        console.error("Error creating disease:", error);
        return Response.json(
            { error: "Failed to create disease" },
            { status: 500 }
        );
    }
}

import DiseasesGrid from "@/components/DiseasesGrid";
import NoContent from "@/components/NoContent";
import { Box } from "@mui/material";
import { disease } from "@/types/disease";
import { getPlantDiseases } from "@/lib/firebaseAdmin/database";
import Link from "next/link";

const Diseases = async ({ params }: { params: Promise<{ plantId: string }> }) => {
    const { plantId } = await params;
    console.log("Fetching diseases for plantId:", plantId);
    let data: disease[];
    try {
        data = await getPlantDiseases(plantId);
    } catch (error) {
        return (
            <Link href="/not-found" />
        );
    }

    return (
        <Box>
            {data && 
                <Box sx={{ p: 1 }}>
                    <DiseasesGrid diseases={data} />
                </Box>
            }
            {!data && 
                <NoContent />
            }
        </Box>
    );
};
export default Diseases;
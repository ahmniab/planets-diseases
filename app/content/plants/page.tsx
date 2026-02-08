
import { FC } from "react";
import { 
    Box,
    Container
 } from "@mui/material";
import PlantsGrid from "@/components/PlantsGrid";
import { getAllPlants } from "@/lib/firebaseAdmin/database";
import Link from "next/link";

const Plants: FC = async () => {
    let plants = [];
    try {
        plants = await getAllPlants();

    } catch (error) {
        return (
            <Link href="/not-found" />
        );
    }

    return (
        <Container sx={{ p: 2 }}>
            <PlantsGrid plants={plants ?? []} />
        </Container>
    );
}
export default Plants;
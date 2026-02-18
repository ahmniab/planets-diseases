
import { 
    Container,
    Box,
} from "@mui/material";
import PlantsGrid from "@/components/PlantsGrid";
import { getAllPlants, getAllPlantsCount } from "@/lib/firebaseAdmin/database";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";
import CustomPagination from "@/components/shared/Pagination";
import NoResults from "@/components/NoResults";


const Plants = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => { 
    const query = (await searchParams).q as string || "";
    const page = parseInt((await searchParams).p as string) || 1;
    
    let plants = [];
    let pageCount = 0; 
    try {
        plants = await getAllPlants(query, page);
        pageCount = Math.ceil(await getAllPlantsCount(query) / 10);
    } catch (error) {
        return (
            <Link href="/not-found" />
        );
    }

    return (
        <>
            <Container sx={{ p: 2, minHeight: "75vh" }}>
                <SearchBar 
                    initialSearchText={query} 
                    navigateString={`/content/plants?q=%s&p=1`}
                />
                { 
                (query !== '' && plants.length === 0) ? 
                    <NoResults message={`لم يتم العثور على نباتات تطابق بحثك: "${query}"`} /> :
                    <PlantsGrid plants={plants ?? []} />
                }
            </Container>
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                mt: 0,
            }} >
                {plants.length > 0 && <CustomPagination 
                    count={pageCount} 
                    page={page}
                    navigateString={`/content/plants?q=${query}&p=%s`}
                />}
            </Box>
        </>
    );
}
export default Plants;
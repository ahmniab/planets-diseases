import DiseasesGrid from "@/components/DiseasesGrid";
import NoContent from "@/components/NoContent";
import { Box, Container } from "@mui/material";
import { disease } from "@/types/disease";
import { getPlantById, getPlantDiseases, getPlantDiseasesCount } from "@/lib/firebaseAdmin/database";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";
import CustomPagination from "@/components/shared/Pagination";
import type { plant } from "@/types/plant";
import CustomBreadcrumbs from "@/components/shared/CustomBreadcrumbs";

const Diseases = async ({ params, searchParams }: { 
    params: Promise<{ plantId: string }>, 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => 
{
    const { plantId } = await params;
    const query = (await searchParams).q as string || "";
    const page = parseInt((await searchParams).p as string) || 1;

    
    let plant : plant|null = await getPlantById(plantId);
    let data: disease[];
    let pageCount = 0;
    try {
        data = await getPlantDiseases(plantId, query, page);
        pageCount = Math.ceil(await getPlantDiseasesCount(plantId, query) / 10);
    } catch (error) {
        return (
            <Link href="/not-found" />
        );
    }

    const navigationItems = [
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "النباتات", href: "/content/plants" },
        { label: `أمراض ${plant?.name || 'النبات'}`},
    ];

    return (
        <>
        <Container sx={{ mt: 1, minHeight: '75vh' }}>
            <CustomBreadcrumbs items={navigationItems} />
            <SearchBar 
                searchPlaceholder={`ابحث عن امراض ${plant?.name || 'النبات'}`} 
                navigateString={`/content/plants/${plantId}/diseases?q=%s&p=1`} 
                initialSearchText={query}
            />
            {data && 
                <DiseasesGrid diseases={data} />
            }
            {!data || data.length === 0 && 
                <NoContent />
            }
        </Container>
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 0,
        }} >
            {data && <CustomPagination page={page} count={pageCount} navigateString={`/content/plants/${plantId}/diseases?q=${query}&p=%s`}/>}
        </Box>
        </>
    );
};
export default Diseases;
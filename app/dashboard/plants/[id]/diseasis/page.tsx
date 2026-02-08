import PlantDiseasesPage from "@/components/dashboard/diseases";

const PlansDiseasePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    
    return <PlantDiseasesPage plantId={id} />;
};

export default PlansDiseasePage;
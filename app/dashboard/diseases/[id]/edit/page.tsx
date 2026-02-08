import EditDiseasePage from "@/components/dashboard/edit-disease";

const EditDiseasePageRoute = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    
    return <EditDiseasePage diseaseId={id} />;
};

export default EditDiseasePageRoute;

import DiseaseDoc from "@/components/diseaseDoc";
import { getDiseaseDocByDiseaseId } from "@/lib/firebaseAdmin/database";
import { Alert, Container } from "@mui/material";

const Diseases = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const data = await getDiseaseDocByDiseaseId(id);

    if (!data) {
        return (
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                <Alert severity="info" sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}>
                    لم يتم العثور على وثيقة لهذا المرض
                </Alert>
            </Container>
        );
    }
    
    return <DiseaseDoc data={data} />;
};

export default Diseases;
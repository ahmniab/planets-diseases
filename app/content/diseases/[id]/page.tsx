import DiseaseDoc from "@/components/diseaseDoc";
import { getDiseaseById, getDiseaseDocByDiseaseId } from "@/lib/firebaseAdmin/database";
import { Alert, Container } from "@mui/material";
import CustomBreadcrumbs from "@/components/shared/CustomBreadcrumbs";

const Diseases = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const docData = await getDiseaseDocByDiseaseId(id);
    const disease = await getDiseaseById(id);

    if (!docData) {
        return (
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                <Alert severity="info" sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}>
                    لم يتم العثور على وثيقة لهذا المرض
                </Alert>
            </Container>
        );
    }
    if (!disease) {
        return (
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                <Alert severity="info" sx={{ fontFamily: '"Noto Sans Arabic", "Cairo", "Tajawal", sans-serif' }}>
                    لم يتم العثور على المرض
                </Alert>
            </Container>
        );
    }

    const navigationItems = [
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "النباتات", href: "/content/plants" },
        { label: `الأمراض`, href: `/content/plants/${disease.plantId}/diseases` },
        { label: disease.name},
    ];
    
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                <CustomBreadcrumbs items={navigationItems} />
            </Container>
            <Container maxWidth="md" sx={{ mt: 1, mb: 6 }}>
                <DiseaseDoc data={docData} />
            </Container>
        </>
    );
};

export default Diseases;
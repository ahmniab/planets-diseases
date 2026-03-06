import { 
    styled, 
    Paper,
    Container,
    Box,
} from "@mui/material";
import DiseaseDoc from "@/components/diseaseDoc";
import DynamicComponentRenderer from "@/components/diseaseDoc/DynamicComponentRenderer";
import { diseaseDoc } from "@/types/disease";

const StyledPaper = styled(Box)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    // border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    // minHeight: '600px',
    overflowY: 'hidden',
}));

interface PreviewProps {
    data: diseaseDoc;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
    return (
        <StyledPaper>

            <Container maxWidth="md" sx={{ 
                mt: 1, 
                mb: 6,
            }}>
                <DynamicComponentRenderer data={data} />
            </Container>
        </StyledPaper>
     );
};

export default Preview;
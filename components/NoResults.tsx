import { Box } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface NoResultsProps {
    message?: string;
}
const NoResults: React.FC<NoResultsProps> = ({ message }) => {
    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            mt: 4,
        }}>
            <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary" }} />
            <Box sx={{ mt: 2, color: "text.secondary" }}>
                {message || "لا توجد نتائج"}
            </Box>
        </Box>
    );
}

export default NoResults;
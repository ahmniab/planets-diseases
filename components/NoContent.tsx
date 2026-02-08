import { 
    Box, 
    Typography 
} from "@mui/material";

const NoContent = () => {
    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
                لا توجد محتويات لعرضها في الوقت الحالي.
            </Typography>
        </Box>
    );
}
export default NoContent;
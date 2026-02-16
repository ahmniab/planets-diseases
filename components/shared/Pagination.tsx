'use client';
import { 
    Pagination,
    Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import util from "util";

interface PaginationProps {
    count: number;
    page: number;
    onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
    navigateString?: string;
}
const CustomPagination: React.FC<PaginationProps> = ({ count, page, onChange, navigateString }) => {
    const router = useRouter();
    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 0,
        }} >
            <Pagination 
                count={count} 
                page={page}
                onChange={(event, value) => {
                    onChange && onChange(event, value);
                    if (navigateString) {
                        const url = util.format(navigateString, value);
                        router.push(url);
                    }
                }}
                color="primary"
            />
        </Box>
    );
}

export default CustomPagination;
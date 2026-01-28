import { FC } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import { Box } from '@mui/material';

const Mainlayout: FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <Box
            sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
export default Mainlayout;
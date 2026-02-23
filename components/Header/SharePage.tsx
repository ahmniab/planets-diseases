'use client';

import { FC, use, useState } from 'react';
import { 
    Box, 
    Typography,
    IconButton,
    Tooltip,
    Popper,
    PopperPlacementType,
    Fade,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import QRCode from 'react-qr-code';
import CopyClipboardField from '../shared/CopyClipbardField';

const SharePage: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<PopperPlacementType>('bottom');

    const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <Box>
            <Tooltip title="مشاركة الصفحة">
                <IconButton onClick={handleClick('bottom')}>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={500}>
                        <Box sx={{ p: 2, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1 }}>
                            <Typography variant="body1" textAlign={'center'}>شارك الصفحة</Typography>
                            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', background: 'white', p: 1, borderRadius: 1 }}>
                                <QRCode value={window.location.href} />
                        </Box>
                        <CopyClipboardField value={window.location.href} />
                    </Box>  
                    </Fade>
                )}
            </Popper>
        </Box>
    );
};

export default SharePage;

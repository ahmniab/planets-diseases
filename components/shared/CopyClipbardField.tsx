import {
    TextField,
    IconButton,
    Tooltip,
    Box,
} from '@mui/material';
import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckIcon from '@mui/icons-material/Check';
import { copyToClipboard } from '../../utils/clipboardUtils';

const CopyClipboardField: React.FC<{ value: string }> = ({ value }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        copyToClipboard(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <TextField
                value={value}
                disabled
                variant="outlined"
                size="small"
                fullWidth
            />
            <Tooltip title={copied ? 'تم النسخ!' : 'نسخ إلى الحافظة'}>
                <IconButton onClick={handleCopy} color={copied ? 'success' : 'default'}>
                    {copied ? <CheckIcon /> : <ContentPasteIcon />}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default CopyClipboardField;
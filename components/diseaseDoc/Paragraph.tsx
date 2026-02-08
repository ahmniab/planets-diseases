'use client';

import { Typography, styled } from '@mui/material';
import { ParagraphBlockData } from '@/types/disease';

const StyledParagraph = styled(Typography)(({ theme }) => ({
    lineHeight: 1.8,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    fontSize: '1.05rem',
    '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
    '& b, & strong': {
        fontWeight: 700,
    },
    '& i, & em': {
        fontStyle: 'italic',
    },
    '& code': {
        backgroundColor: theme.palette.action.hover,
        padding: '2px 6px',
        borderRadius: 4,
        fontFamily: 'monospace',
        fontSize: '0.9em',
    },
    '& mark': {
        backgroundColor: theme.palette.warning.light,
        padding: '1px 4px',
        borderRadius: 2,
    },
}));

const Paragraph: React.FC<{ data: ParagraphBlockData }> = ({ data }) => {
    if (!data.text) return null;

    return (
        <StyledParagraph
            variant="body1"
            dangerouslySetInnerHTML={{ __html: data.text }}
        />
    );
};

export default Paragraph;

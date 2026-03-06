'use client';

import { Box, Container, styled } from '@mui/material';
import {
    diseaseDoc,
} from '@/types/disease';
import DynamicComponentRenderer from './DynamicComponentRenderer';

const DocWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4, 5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    minHeight: '60vh',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.06)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2.5, 2),
        borderRadius: theme.spacing(1.5),
    },
}));


const DiseaseDoc: React.FC<{ data: diseaseDoc }> = ({ data }) => {
    return (
        <DocWrapper>
            <DynamicComponentRenderer data={data} />
        </DocWrapper>
    );
};

export default DiseaseDoc;

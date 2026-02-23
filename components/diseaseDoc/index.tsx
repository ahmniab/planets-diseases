'use client';

import { Box, Container, styled } from '@mui/material';
import {
    diseaseDoc,
    diseaseDocBlock,
    HeaderBlockData,
    ParagraphBlockData,
    SimpleImageBlockData,
    ListBlockData,
    TableBlockData,
} from '@/types/disease';
import Header from './Header';
import Paragraph from './Paragraph';
import DiseaseImage from './DiseaseImage';
import DocList from './DocList';
import DocTable from './DocTable';
import Delimiter from './Delimiter';

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

const renderBlock = (block: diseaseDocBlock) => {
    switch (block.type) {
        case 'header':
            return <Header data={block.data as HeaderBlockData} />;
        case 'paragraph':
            return <Paragraph data={block.data as ParagraphBlockData} />;
        case 'image':
            return <DiseaseImage data={block.data as SimpleImageBlockData} />;
        case 'list':
            return <DocList data={block.data as ListBlockData} />;
        case 'table':
            return <DocTable data={block.data as TableBlockData} />;
        case 'delimiter':
            return <Delimiter />;
        default:
            return null;
    }
};

const DiseaseDoc: React.FC<{ data: diseaseDoc }> = ({ data }) => {
    return (
        <DocWrapper>
            {data.blocks.map((block, index) => (
                <Box key={block.id || index}>
                    {renderBlock(block)}
                </Box>
            ))}
        </DocWrapper>
    );
};

export default DiseaseDoc;

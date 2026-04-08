'use client';

import { Box } from '@mui/material';
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


export const renderBlock = (block: diseaseDocBlock) => {
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

const FlatRenderer: React.FC<{ data: diseaseDoc }> = ({ data }) => {
    return (
        <>
            {data.blocks.map((block, index) => (
                <Box key={block.id || index}>
                    {renderBlock(block)}
                </Box>
            ))}
        </>
    );
};

export default FlatRenderer;

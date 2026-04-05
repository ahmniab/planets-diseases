'use client';

import { useState } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { diseaseDoc, diseaseDocBlock, HeaderBlockData } from '@/types/disease';
import { renderBlock } from './FlatRenderer';

type Section = { header: diseaseDocBlock; body: diseaseDocBlock[] };

function groupIntoSections(blocks: diseaseDocBlock[]): {
    pre: diseaseDocBlock[];
    sections: Section[];
} {
    const headerLevels = blocks
        .filter(b => b.type === 'header')
        .map(b => (b.data as HeaderBlockData).level);

    if (headerLevels.length === 0) return { pre: blocks, sections: [] };

    const minLevel = Math.min(...headerLevels);

    const pre: diseaseDocBlock[] = [];
    const sections: Section[] = [];

    for (const block of blocks) {
        const isMainHeader =
            block.type === 'header' &&
            (block.data as HeaderBlockData).level === minLevel;

        if (isMainHeader) {
            sections.push({ header: block, body: [] });
        } else if (sections.length === 0) {
            pre.push(block);
        } else {
            sections[sections.length - 1].body.push(block);
        }
    }

    return { pre, sections };
}

const CollapsibleSection: React.FC<{ section: Section; index: number }> = ({
    section,
    index,
}) => {
    const [open, setOpen] = useState(false);
    const headerData = section.header.data as HeaderBlockData;

    return (
        <Box>
            <Button
                onClick={() => setOpen((prev) => !prev)}
                endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                fullWidth
                sx={{
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '2rem',
                    borderBottom: (theme) =>
                        `3px solid ${theme.palette.primary.main}`,
                    borderRadius: 0,
                    paddingY: 1,
                    paddingX: 0,
                    marginTop: 3,
                    marginBottom: open ? 0 : 2,
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                disableRipple={false}
                dangerouslySetInnerHTML={undefined}
            >
                <span dangerouslySetInnerHTML={{ __html: headerData.text }} />
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                    {section.body.map((block, i) => (
                        <Box key={block.id || `${index}-${i}`}>
                            {renderBlock(block)}
                        </Box>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

const CollapsibleRenderer: React.FC<{ data: diseaseDoc }> = ({ data }) => {
    const { pre, sections } = groupIntoSections(data.blocks);

    return (
        <>
            {pre.map((block, i) => (
                <Box key={block.id || i}>
                    {renderBlock(block)}
                </Box>
            ))}
            {sections.map((section, i) => (
                <CollapsibleSection
                    key={section.header.id || i}
                    section={section}
                    index={i}
                />
            ))}
        </>
    );
};

export default CollapsibleRenderer;

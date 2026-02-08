'use client';

import { Box, Typography, styled, alpha } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ListBlockData, ListItem as ListItemType } from '@/types/disease';

const ListWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    paddingInlineStart: theme.spacing(1),
}));

const OrderedList = styled('ol')(({ theme }) => ({
    margin: 0,
    paddingInlineStart: theme.spacing(3),
    '& li': {
        marginBottom: theme.spacing(0.75),
        lineHeight: 1.7,
        color: theme.palette.text.primary,
        fontSize: '1.05rem',
        '&::marker': {
            color: theme.palette.primary.main,
            fontWeight: 600,
        },
    },
}));

const UnorderedList = styled('ul')(({ theme }) => ({
    margin: 0,
    paddingInlineStart: theme.spacing(3),
    listStyleType: 'disc',
    '& li': {
        marginBottom: theme.spacing(0.75),
        lineHeight: 1.7,
        color: theme.palette.text.primary,
        fontSize: '1.05rem',
        '&::marker': {
            color: theme.palette.primary.main,
        },
    },
}));

const ChecklistItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'checked',
})<{ checked?: boolean }>(({ theme, checked }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.75, 1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: checked
        ? alpha(theme.palette.success.main, 0.08)
        : 'transparent',
    transition: 'background-color 0.2s ease',
}));

const ChecklistText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'checked',
})<{ checked?: boolean }>(({ theme, checked }) => ({
    lineHeight: 1.7,
    fontSize: '1.05rem',
    color: checked ? theme.palette.text.secondary : theme.palette.text.primary,
    textDecoration: checked ? 'line-through' : 'none',
}));

const renderListItems = (items: ListItemType[], style: string) => {
    return items.map((item, idx) => {
        if (style === 'checklist') {
            return (
                <Box key={idx}>
                    <ChecklistItem checked={item.meta?.checked}>
                        {item.meta?.checked ? (
                            <CheckBoxIcon
                                sx={{ fontSize: 22, color: 'success.main', mt: 0.25 }}
                            />
                        ) : (
                            <CheckBoxOutlineBlankIcon
                                sx={{ fontSize: 22, color: 'text.secondary', mt: 0.25 }}
                            />
                        )}
                        <ChecklistText
                            checked={item.meta?.checked}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </ChecklistItem>
                    {item.items?.length > 0 && (
                        <Box sx={{ pl: 4 }}>
                            {renderListItems(item.items, style)}
                        </Box>
                    )}
                </Box>
            );
        }

        return (
            <li key={idx}>
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
                {item.items?.length > 0 && (
                    style === 'ordered' ? (
                        <OrderedList>{renderListItems(item.items, style)}</OrderedList>
                    ) : (
                        <UnorderedList>{renderListItems(item.items, style)}</UnorderedList>
                    )
                )}
            </li>
        );
    });
};

const DocList: React.FC<{ data: ListBlockData }> = ({ data }) => {
    if (!data.items?.length) return null;

    if (data.style === 'checklist') {
        return (
            <ListWrapper>
                {renderListItems(data.items, 'checklist')}
            </ListWrapper>
        );
    }

    if (data.style === 'ordered') {
        return (
            <ListWrapper>
                <OrderedList start={data.meta?.start}>
                    {renderListItems(data.items, 'ordered')}
                </OrderedList>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper>
            <UnorderedList>
                {renderListItems(data.items, 'unordered')}
            </UnorderedList>
        </ListWrapper>
    );
};

export default DocList;

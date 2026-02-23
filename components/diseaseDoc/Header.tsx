'use client';
import { Typography, styled } from '@mui/material';
import { HeaderBlockData } from '@/types/disease';

const StyledHeader = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    '&.level-1': {
        fontSize: '2rem',
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    '&.level-2': {
        fontSize: '1.65rem',
        borderBottom: `2px solid ${theme.palette.divider}`,
        paddingBottom: theme.spacing(0.75),
        marginBottom: theme.spacing(1.5),
    },
    '&.level-3': {
        fontSize: '1.4rem',
    },
    '&.level-4': {
        fontSize: '1.2rem',
        fontWeight: 600,
    },
    '&.level-5': {
        fontSize: '1.05rem',
        fontWeight: 600,
    },
    '&.level-6': {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: theme.palette.text.secondary,
    },
})) as typeof Typography;

const levelMap: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
};

const Header: React.FC<{ data: HeaderBlockData }> = ({ data }) => {
    if (!data.text) return null;

    const variant = levelMap[data.level] || 'h2';

    return (
        <StyledHeader
            variant={variant}
            className={`level-${data.level}`}
            dangerouslySetInnerHTML={{ __html: data.text }}
        />
    );
};

export default Header;

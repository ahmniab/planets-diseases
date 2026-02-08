'use client';
import { Box, styled } from '@mui/material';

const StyledDelimiter = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '&::before, &::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: theme.palette.divider,
    },
}));

const Dot = styled('span')(({ theme }) => ({
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
}));

const Delimiter: React.FC = () => {
    return (
        <StyledDelimiter>
            <Dot />
            <Dot />
            <Dot />
        </StyledDelimiter>
    );
};

export default Delimiter;

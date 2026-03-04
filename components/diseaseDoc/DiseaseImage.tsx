'use client';

import { Box, Typography, styled, alpha } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import { SimpleImageBlockData } from '@/types/disease';

const ImageWrapper = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'withBorder' && prop !== 'withBackground' && prop !== 'stretched',
})<{ withBorder?: boolean; withBackground?: boolean; stretched?: boolean }>(
    ({ theme, withBorder, withBackground, stretched }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: stretched ? '100%' : '85%',
        marginInline: stretched ? 0 : 'auto',
        ...(withBackground && {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            padding: theme.spacing(2),
            borderRadius: theme.spacing(2),
        }),
        ...(withBorder && {
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(1),
        }),
    }),
);

const StyledImage = styled('img')({
    maxWidth: '100%',
    height: '300px',
    borderRadius: 12,
    display: 'block',
    objectFit: 'cover',
});

const Caption = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
}));


const DiseaseImage: React.FC<{ data: SimpleImageBlockData }> = ({ data }) => {
    if (!data.url) return null;

    return (
        <ImageWrapper
            withBorder={data.withBorder}
            withBackground={data.withBackground}
            stretched={data.stretched}
        >
            <Zoom>
                <StyledImage src={data.url} alt={data.caption || ''} loading="lazy" />
            </Zoom>
            {data.caption && (
                <Caption dangerouslySetInnerHTML={{ __html: data.caption }} variant="body2" />
            )}
        </ImageWrapper>
    );
};

export default DiseaseImage;

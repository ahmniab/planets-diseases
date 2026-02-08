'use client';
import React, { use } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  useTheme,
  alpha,
} from '@mui/material';

import {
  Search,
} from '@mui/icons-material';

import { useRouter } from 'next/navigation';

const stats = [
  { number: '200+', label: 'مرض مُفهرس' },
  { number: '50+', label: 'نوع نبات' },
  { number: '100%', label: 'محتوى علمي' },
  { number: '24/7', label: 'متاح مجاناً' },
];

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.light, 0.1),
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: alpha(theme.palette.secondary.light, 0.1),
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            دليل أمراض النباتات
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            مرجع شامل لأمراض النباتات وطرق علاجها والوقاية منها
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onClick={() => router.push('/content/plants')}
            >
              &nbsp;تصفح الدليل
            </Button>
          </Box>
        </Box>

        {/* Statistics */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{
            mb: 6,
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 1,
                }}
              >
                {stat.number}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
export default HeroSection;

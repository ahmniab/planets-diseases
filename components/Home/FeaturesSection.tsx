'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';

import {
  Search,
  LocalHospital,
  Park,
  Science,
} from '@mui/icons-material';


const features = [
  {
    icon: Search,
    title: 'البحث في الأمراض',
    description: 'ابحث في دليل شامل لأمراض النباتات المختلفة وأعراضها',
    color: '#4CAF50',
  },
  {
    icon: LocalHospital,
    title: 'معلومات تفصيلية',
    description: 'تفاصيل دقيقة حول كل مرض وأسبابه وطرق انتشاره',
    color: '#2196F3',
  },
  {
    icon: Science,
    title: 'طرق العلاج',
    description: 'دليل شامل لطرق العلاج المختلفة لكل مرض من أمراض النباتات',
    color: '#FF5722',
  },
  {
    icon: Park,
    title: 'الوقاية والحماية',
    description: 'نصائح وإرشادات للوقاية من الأمراض والحفاظ على صحة النباتات',
    color: '#9C27B0',
  },
];

const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
          }}
        >
          محتويات الدليل
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          مرجع علمي شامل يحتوي على معلومات تفصيلية عن أمراض النباتات وطرق علاجها
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 4,
        }}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: alpha(feature.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: '2rem',
                        color: feature.color,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default FeaturesSection;

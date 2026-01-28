'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
      <Container maxWidth="md"> 
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            gap: 3
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: 'text.primary',
              fontWeight: 'medium'
            }}
          >
            الصفحة غير موجودة
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              maxWidth: '500px',
              lineHeight: 1.6
            }}
          >
            عذراً، الصفحة التي تبحث عنها غير موجودة. قد تكون قد حُذفت أو نُقلت إلى مكان آخر.
            يمكنك العودة إلى الصفحة الرئيسية لتصفح دليل أمراض النباتات.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
              &nbsp;
            العودة للصفحة الرئيسية
          </Button>
          
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              maxWidth: '400px'
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              روابط مفيدة
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • تصفح الأمراض الشائعة<br/>
              • البحث في قاعدة البيانات<br/>
              • معلومات الوقاية والعلاج
            </Typography>
          </Box>
        </Box>
      </Container>
  );
};

export default NotFound;
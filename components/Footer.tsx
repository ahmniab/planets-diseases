'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  styled,
} from '@mui/material';
import {
  Facebook,
  WhatsApp,
  Email,
  LocalFlorist,
  Science,
  PhoneEnabled,
} from '@mui/icons-material';

const SocialIconButton = styled(IconButton)({
  color: 'white',
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
});

const SocialIconLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
  return (
    <Link href={href} target="_blank">
      <SocialIconButton>
        {children}
      </SocialIconButton>
    </Link>
  );
};

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`,
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {/* Logo and Description */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalFlorist sx={{ fontSize: '2rem', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                NBG
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              مرجع علمي شامل يحتوي على معلومات تفصيلية عن أمراض النباتات المختلفة وطرق علاجها والوقاية منها.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <SocialIconLink href="https://www.facebook.com/share/1ECue1sa8H">
                  <Facebook />
              </SocialIconLink>
              <SocialIconLink href="https://wa.me/+201147926205">
                <WhatsApp />
              </SocialIconLink>
              <SocialIconLink href="tel:+201147926205">
                <PhoneEnabled />
              </SocialIconLink>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              روابط مهمة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/content" color="inherit" sx={{ textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                الصفحة الرئيسية
              </Link>
              <Link href="/content/plants" color="inherit" sx={{ textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                أنواع النباتات
              </Link>
            </Box>
          </Box>

          {/* Contact Information */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              معلومات التواصل
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  <Link href="mailto:mahmoudbesher0114792@gmail.com" color="inherit" sx={{ textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}>
                    mahmoudbesher0114792@gmail.com
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalFlorist sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  مرجع علمي مجاني
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Science sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  محتوى علمي موثوق
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2026 NBG. مرجع علمي مجاني.
          </Typography>
          {/* <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              <Typography variant="body2">سياسة الخصوصية</Typography>
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
              <Typography variant="body2">شروط الاستخدام</Typography>
            </Link>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  Container,
  CircularProgress
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { SetSession } from '@/lib/auth/client';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <CircularProgress sx={{ color: 'primary.main', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            جاري التحويل إلى لوحة التحكم...
          </Typography>
        </Box>
      </Container>
    );
  }

  const handleEmailLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await signIn(email, password);
      userCredential.user.getIdToken()
      .then(SetSession)
      .then(() => {
        router.push('/dashboard');
      }).catch((error) => {
        console.error('Error setting session cookie:', error);
        setError('فشل في إعداد الجلسة. يرجى المحاولة مرة أخرى.');
      });
      
    } catch (error: any) {
      setError(
        error.code === 'auth/user-not-found' 
          ? 'المستخدم غير موجود'
          : error.code === 'auth/wrong-password'
          ? 'كلمة المرور غير صحيحة'
          : error.code === 'auth/invalid-email'
          ? 'البريد الإلكتروني غير صحيح'
          : 'حدث خطأ أثناء تسجيل الدخول'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              تسجيل الدخول
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ادخل إلى لوحة تحكم دليل أمراض النباتات
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, textAlign: 'right' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleEmailLogin} sx={{ mb: 3 }}>
            <TextField
              dir='ltr'
              fullWidth
              label="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
              />

            <TextField
              dir='ltr'
              fullWidth
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 2, py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
            >
              {loading ? <CircularProgress size={24} /> : 'تسجيل الدخول'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              أو
            </Typography>
          </Divider>


          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              للحصول على حساب، يرجى التواصل مع المدير
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default LoginPage;
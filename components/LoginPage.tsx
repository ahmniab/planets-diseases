'use client';
import { useState, useEffect, useId } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .required('البريد الإلكتروني مطلوب'),
  password: yup
    .string()
    .required('كلمة المرور مطلوبة'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const emailId = useId();
  const passwordId = useId();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      await signIn(data.email, data.password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('تم تجاوز عدد المحاولات المسموح بها. يرجى المحاولة لاحقاً');
      } else {
        setLoginError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى');
      }
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
              ادخل إلى لوحة تحكم NBG
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>

            {loginError && (
              <Alert dir='ltr' severity="error" sx={{ mb: 2 }} onClose={() => setLoginError(null)}>
                {loginError}
              </Alert>
            )}

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={emailId}
                  dir='ltr'
                  fullWidth
                  label="البريد الإلكتروني"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id={passwordId}
                  dir='ltr'
                  fullWidth
                  label="كلمة المرور"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  margin="normal"
                  sx={{ mb: 3 }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mb: 2, py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'تسجيل الدخول'}
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
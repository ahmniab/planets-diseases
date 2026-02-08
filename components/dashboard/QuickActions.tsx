import { 
    Card, 
    Typography, 
    Grid, 
    Button 
} from '@mui/material';

import { useRouter } from 'next/navigation';


const QuickActions = () => {
    const router = useRouter();
    return (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            الإجراءات السريعة
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ p: 2, textTransform: 'none' }}
                onClick={() => router.push('/dashboard/plants')}
              >
                إضافة نبات جديد
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ p: 2, textTransform: 'none' }}
              >
                إضافة مرض جديد
              </Button>
            </Grid>
          </Grid>
        </Card>
    );
};

export default QuickActions;
import { 
    Card, 
    CardContent, 
    Grid, 
    Typography 
} from '@mui/material';
import { 
  BugReport,
  LocalFlorist
} from '@mui/icons-material';

const StatsCards = ({plantsCount, diseasesCount}: {plantsCount: number, diseasesCount: number}) => {
    return (
        <Grid container sx={{ justifyContent: 'center', mb: 4 }} spacing={3}>
          <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Card sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    backgroundColor: 'success.light',
                    cursor: 'pointer'
                }}
                onClick={() => {}}
            >
              <CardContent>
                <LocalFlorist sx={{ fontSize: 40, color: 'success.dark', mb: 1 }} />
                <Typography variant="h6" color="success.dark">
                  النباتات
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="success.dark">
                  {plantsCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs:12, sm: 6, md: 3 }}>
            <Card 
                sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    backgroundColor: 'error.light',
                    cursor: 'pointer'
                }}
                onClick={() => {}}
            >
              <CardContent>
                <BugReport sx={{ fontSize: 40, color: 'error.dark', mb: 1 }} />
                <Typography variant="h6" color="error.dark">
                  الأمراض
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="error.dark">
                  {diseasesCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
};

export default StatsCards;
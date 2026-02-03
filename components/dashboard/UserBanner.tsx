import { 
    Box, 
    Typography,
    Avatar,
    Button
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const UserBanner = ({ user, signOut }: { user: any, signOut: () => any }) => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h6" color="text.primary">
                مرحباً، {user?.displayName || 'المسؤول'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToApp />}
            onClick={handleSignOut}
            sx={{ textTransform: 'none' }}
          >
            &nbsp;تسجيل الخروج
          </Button>
        </Box>
  );
};
export default UserBanner;
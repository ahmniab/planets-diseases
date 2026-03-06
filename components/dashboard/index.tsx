'use client';

import QuickActions from "./QuickActions";
import StatsCards from "./StatsCards";
import UserBanner from "./UserBanner";
import { Box, Typography } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type DashboardProps = {
    diseasesCount?: number;
    plantsCount?: number;
};

const Dashboard = ({ diseasesCount = 0, plantsCount = 0 }: DashboardProps) => {
    const { user, signOut } = useAuth();
  const router = useRouter();

    const handleSignOut = async () => {
      try {
        signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
    return (
        <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: 'background.default' }}>

        <UserBanner user={user} signOut={handleSignOut} />
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            aligs: 'center',
            gap: 2,
          }}
        >
          <DashboardIcon fontSize="large" />
          لوحة تحكم دليل أمراض النباتات
        </Typography>

        <StatsCards plantsCount={plantsCount} diseasesCount={diseasesCount}/>
        
        {/* <QuickActions /> */}
      </Box>
    );
};

export default Dashboard;
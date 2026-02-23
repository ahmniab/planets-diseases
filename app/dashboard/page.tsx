
import Dashboard from '@/components/dashboard';
import { diseaseCount, plantCount } from '@/lib/firebaseAdmin/database';


const DashboardPage = async () => {
  const plantsCount = await plantCount();
  const diseasesCount = await diseaseCount();

  return (
    <Dashboard 
      plantsCount={plantsCount}
      diseasesCount={diseasesCount}
    />
  );
};

export default DashboardPage;
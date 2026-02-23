import { redirect } from 'next/navigation';

const RootPage: React.FC = () => {
    return redirect('/content');
};

export default RootPage;
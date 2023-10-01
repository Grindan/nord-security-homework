'use client';

import { useUserContext } from '@/context/UserContext';

const DashboardPage = () => {
  const { token } = useUserContext();
  return <p className="color-black text-black">Dashboard</p>;
};

export default DashboardPage;

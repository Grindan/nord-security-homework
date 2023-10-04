'use client';

import { useEffect, useState } from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import Table from '@/components/Table';
import serversApi from '@/api/servers';
import { Column } from '@/types/table';

const COLUMNS: Array<Column<'name' | 'distance'>> = [
  { name: 'name', label: 'Name' },
  { name: 'distance', label: 'Distance' },
];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = () => {
    serversApi.fetchServers().then((servers) => {
      setServers(servers);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="rounded-lg w-full md:w-[568px] bg-white p-3 md:p-5">
      <h1 className="text-2xl text-center mb-5 text-slate-800">Servers</h1>
      <Table data={servers} columns={COLUMNS} />
    </section>
  );
};

export default DashboardPage;

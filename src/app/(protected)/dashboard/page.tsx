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
  const [sortBy, setSortBy] = useState(null);

  console.log({ servers })

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = () => {
    serversApi
      .fetchServers()
      .then((servers) => {
        setServers(servers);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="color-black text-black">
      <h1>Servers</h1>
      <Table data={servers} columns={COLUMNS} />
    </section>
  );
};

export default DashboardPage;

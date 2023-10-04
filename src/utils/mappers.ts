import { ServerResponse } from '@/types/servers';

export const mapServerData = (server: ServerResponse) => ({
  ...server,
  // adding id field to use it as key
  id: Math.random().toString(16).slice(2),
});

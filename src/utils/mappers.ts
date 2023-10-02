import { ServerResponse } from '@/types/servers';

export const mapServerData = (server: ServerResponse) => ({
  ...server,
  id: Math.random().toString(16).slice(2),
});

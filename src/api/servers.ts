import { mapServerData } from '@/utils/mappers';
import instance from './axios';

class ServersApi {
  fetchServers() {
    return instance.get('/servers').then((res) => {
      return res.data.map(mapServerData);
    });
  }
}

const serversApi = new ServersApi();
export default serversApi;

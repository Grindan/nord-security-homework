import { mapServerData } from '@/utils/mappers';
import instance from './axios';

class ServersApi {
  fetchServers() {
    return instance.get('/servers').then((res) => {
      return res.data.map(mapServerData);
    });
  }
}

export default new ServersApi();

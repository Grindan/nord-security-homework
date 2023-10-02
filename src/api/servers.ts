import { mapServerData } from '@/utils/mappers';
import instance from './axios';

class ServersApi {
  fetchServers() {
    return instance
      .get('/servers')
      .then((res) => {
        return res.data.map(mapServerData);
      })
      .catch(() => {
        // todo: show error
        // todo: if not authorized, remove token from logout
      });
  }
}

export default new ServersApi();

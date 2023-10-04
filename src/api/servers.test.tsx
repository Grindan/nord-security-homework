import axios from './axios';
import MockAdapter from 'axios-mock-adapter';
import serversApi from './servers';
import { Server } from '@/types/servers';

const mock = new MockAdapter(axios);

jest.mock('../utils/mappers', () => ({
  mapServerData: (server: Server) => server,
}));

describe('ServersApi', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetches servers and maps the data', async () => {
    const mockServerData = [
      { name: 'Server 1', distance: '1000 km' },
      { name: 'Server 2', distance: '2000 km' },
    ];
    const expectedMappedData = mockServerData;

    mock.onGet('/servers').reply(200, mockServerData);

    const response = await serversApi.fetchServers();

    expect(mock.history.get.length).toBe(1);

    expect(response).toEqual(expectedMappedData);
  });
});

import { mapServerData } from './mappers';
import { ServerResponse } from '@/types/servers';

describe('mapServerData', () => {
  it('should return the server data with an id field', () => {
    const mockServerData: ServerResponse = {
      name: 'Test Server',
      distance: '100',
    };

    const result = mapServerData(mockServerData);

    expect(result.name).toEqual(mockServerData.name);
    expect(result.distance).toEqual(mockServerData.distance);

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('string');
    expect(result.id.length).toBeGreaterThan(0);
  });
});

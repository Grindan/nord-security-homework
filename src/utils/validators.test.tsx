import { required } from './validators';

describe('required function', () => {
  it('should return undefined when value is provided', () => {
    const testValue = 'Test String';
    expect(required(testValue)).toBeUndefined();
  });

  it('should return "Required" for empty string', () => {
    expect(required('')).toEqual('Required');
  });

  it('should return "Required" for whitespace string', () => {
    expect(required('    ')).toEqual('Required');
  });

  it('should return "Required" for undefined value', () => {
    expect(required(undefined)).toEqual('Required');
  });

  it('should return undefined for string with whitespace but containing other characters', () => {
    expect(required(' Test ')).toBeUndefined();
  });
});

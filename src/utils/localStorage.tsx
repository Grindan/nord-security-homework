const PATH = 'NordSecurity';

export const loadAuthToken = () => {
  const value = localStorage.getItem(PATH);
  return value ? JSON.parse(value) : null;
};

export const saveAuthToken = (value: any) => {
  return localStorage.setItem(PATH, JSON.stringify(value));
};
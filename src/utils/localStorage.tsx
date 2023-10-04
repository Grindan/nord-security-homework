const PATH = 'NordSecurity';

export const loadAuthToken = () => {
  const value = localStorage.getItem(PATH);
  return value ? JSON.parse(value) : null;
};

export const saveAuthToken = (value: string) => {
  return localStorage.setItem(PATH, JSON.stringify(value));
};

export const removeAuthToken = () => {
  return localStorage.removeItem(PATH);
};

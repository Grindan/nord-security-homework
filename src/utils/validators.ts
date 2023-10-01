export const required = (value?: string) => {
  return value?.trim() ? undefined : 'Required';
};

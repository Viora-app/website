export const schema = {
  name: (value: any) => typeof value === 'string' && value.length > 3,
  description: (value: any) => typeof value === 'string' && value.length >= 140,
};

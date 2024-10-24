export const schema = {
  name: (value: any) => typeof value === 'string' && value.length > 3,
  description: (value: any) =>
    typeof value === 'string' && value.length >= 10 && value.length < 100,
  rewards: (value: any) => typeof value === 'string' && value.length >= 140,
  amount: (value: any) => typeof value === 'number' && value > 0,
};

export const schema = {
  name: (value: any) => typeof value === 'string' && value.length > 3,
  summary: (value: any) =>
    typeof value === 'string' && value.length >= 70 && value.length < 140,
  description: (value: any) => typeof value === 'string' && value.length >= 140,
  project_type: /(single|EP|Album|MusicVideo)/,
  planned_release_date: /\d{4}-\d{2}-\d{2}$/,
  soft_goal: (value: any) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  },
  deadline: /\d{4}-\d{2}-\d{2}$/,
  hard_goal: (value: any) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  },
};

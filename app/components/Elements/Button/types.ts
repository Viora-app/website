export enum ButtonThemes {
  primary = 'primary',
  secondary = 'secondary',
}

export interface ButtonProps {
  onPress?: () => void;
  theme?: ButtonThemes;
  title: string;
  className?: string;
  shadow?: boolean;
  disabled?: boolean;
}

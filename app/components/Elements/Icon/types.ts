import type {ViewStyle, StyleProp} from '../../Polyfills';

export interface IconProps {
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export interface IconsConfig {
  [key: string]: string[];
}

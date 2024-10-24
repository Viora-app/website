import {InputModeOptions} from 'react-native';

export interface InputProps {
  value: string | undefined;
  onChange: (fieldName: string) => (value: string) => void;
  name: string;
  placeholder: string;
  multiline?: boolean;
  style?: string;
  inputMode?: InputModeOptions;
}

import {ViewStyle} from 'react-native';

export interface ImagePickerProps {
  onSelectImage: (file: any) => void;
  style?: ViewStyle;
  children: React.ReactNode;
  disabled?: boolean;
}

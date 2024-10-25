import {ReactNode} from 'react';

import {ViewStyle} from '../../Polyfills';

export interface ImagePickerProps {
  onSelectImage: (file: any) => void;
  style?: ViewStyle;
  children: ReactNode;
  disabled?: boolean;
}

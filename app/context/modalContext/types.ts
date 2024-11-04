import {ReactElement} from 'react';
import {StaticImageData} from 'next/image';

export interface ModalProviderProps {
  children: ReactElement;
}

export interface ModalContent {
  title: string;
  description: string;
  image?: string | StaticImageData;
  content?: ReactElement;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
}

export type Show = (content: ModalContent) => void;
export type Hide = () => void;

export interface ModalContextType {
  show: Show;
  hide: Hide;
  isVisible: boolean;
}

import { ReactNode } from 'react';

export interface BaseElementProps {
  children?: ReactNode;
  style?: Record<string, unknown>;
  className?: string;
}

export interface ImageProps {
  source: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export interface LinkProps {
  to: {
    screen: string;
    params: Record<string, unknown>
  };
  children: ReactNode;
  className?: string;
  markActive?: boolean;
}

export interface TextInputProps {
  className?: string;
  keyboardType?: string;
  onChangeText: (e: unknown) => void;
}

export interface TouchableProps {
  className?: string;
  onPress?: (e: unknown) => void;
  children?: ReactNode;
  disabled?: boolean;
}
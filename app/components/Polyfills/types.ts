import { ReactNode } from 'react';

export interface BaseElementProps {
  children: ReactNode;
  className?: string;
}

export interface ImageProps {
  source: string;
  className?: string;
}

export interface LinkProps {
  to: {
    screen: string;
    params: Record<string, unknown>
  };
  children: ReactNode;
  className?: string;
}

export interface TextInputProps {
  className?: string;
  keyboardType?: string;
  onChangeText: (e: unknown) => void;
}
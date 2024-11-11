import {ElementType} from 'react';

export enum FormStep {
  Form = 'form',
  Review = 'review',
}

export interface FormStepsProps {
  Form: ElementType;
  Review: ElementType;
  submit: (data: Record<string, unknown>) => Promise<{
    success: boolean;
    error: string;
  }>
}

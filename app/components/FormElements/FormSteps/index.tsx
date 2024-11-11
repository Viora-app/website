'use client'

import React, {FC, useState} from 'react';

import {FormStep, FormStepsProps} from './types';
import {FetchStatus} from '@/app/config/types';

const FormSteps: FC<FormStepsProps> = ({Form, Review, submit}) => {
  const [step, setStep] = useState<FormStep>(FormStep.Form);
  const [formData, setFormData] = useState<Record<string, unknown>>();
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: ','
  });

  const handleProceed = (data: Record<string, unknown>) => {
    console.log('FormSteps:handleProceed', data);
    setFormData(data);
    setStep(FormStep.Review);  // Go to summary step
  };

  const handleEdit = () => {
    setStep(FormStep.Form);  // Go back to form step
  };

  const handleSubmit = async(data: Record<string, unknown>) => {
    setFeedback({
      status: FetchStatus.Pending,
      message: ','
    });
    const result = await submit(data);
    setFeedback({
      status: result.success ? FetchStatus.Success : FetchStatus.Error,
      message: result.error,
    });
  };

  return (
    <>
      {step === FormStep.Form ? (
        <Form initialData={formData} onProceed={handleProceed} />
      ) : (
        <Review data={formData} onEdit={handleEdit} onSubmit={handleSubmit} feedback={feedback} />
      )}
    </>
  );
};

export default FormSteps;

'use client'
import React, {FC, useState} from 'react';

import {SafeArea} from '@/app/components/Elements';
import FormSteps from '@/app/components/FormElements/FormSteps';
import {SubmitStatus} from '@/app/components/FormElements/FormSteps/types';
import Form from '@/app/components/Forms/Project/Create';
import Review from '@/app/components/Forms/Project/Create/Review';
import { createProject } from '@/app/utils/api';

const ProjectCreateScreen: FC = () => {
  const [feedback, setFeedback] = useState({
    status: SubmitStatus.Idle,
    message: '',
  });

  const handleSubmit = async (data: unknown) => {
    setFeedback({ status: SubmitStatus.Pending, message: '' });

    try {
      const response = await createProject(data);

      if (!response.success) throw new Error('Error creating project');

      setFeedback({ status: SubmitStatus.Success, message: 'Project created successfully!' });
    } catch (error) {
      setFeedback({ status: SubmitStatus.Error, message: 'Failed to create project. Please try again.' });
      console.error(error);
    }
  };

  return (
    <SafeArea>
      <FormSteps
        Form={Form}
        Review={Review}
        onSubmit={handleSubmit}
        feedback={feedback}
      />
    </SafeArea>
  );
}

export default ProjectCreateScreen;

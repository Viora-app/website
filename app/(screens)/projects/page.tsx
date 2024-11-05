'use client'

import React, {FC} from 'react';

import {SafeArea} from '@/app/components/Elements';
import Projects from '@/app/components/Projects';
import Form from '@/app/components/Forms/Project/Create';
import ModalButton from '@/app/components/ModalButton';
import {ButtonType} from '@/app/components/ModalButton/types';

const modalProps = {
  title: 'Let the world know',
  description: 'and receive love and support',
};

const ProjectsScreen: FC = () => {
  return (
    <SafeArea>
      <Projects />
      <ModalButton type={ButtonType.Add} modalContent={Form} {...modalProps} />
    </SafeArea>
  );
};

export default ProjectsScreen;

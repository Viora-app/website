'use client'

import React, {FC} from 'react';

import {SafeArea} from '../../components/Elements';
import Projects from '../../components/Projects';
import Form from '../../components/Forms/Project/Create';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';

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

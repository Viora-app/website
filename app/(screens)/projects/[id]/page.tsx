'use client'

import React, {FC, useEffect, useState} from 'react';

import {SafeArea} from '../../../components/Elements';
import ProjectDetails from '../../../components/ProjectDetails';

const ProjectDetailsScreen: FC = ({params}) => {
  const [id, setId] = useState('');

  const getId = async () => {
    const awaitedParams = await params;
    setId(awaitedParams.id ?? '');
  };
  
  useEffect(() => {
    if (params) {
      getId();
    }
  }, [params]);

  return (
    <SafeArea safeArea>
      <ProjectDetails id={id} />
    </SafeArea>
  );
}

export default ProjectDetailsScreen;

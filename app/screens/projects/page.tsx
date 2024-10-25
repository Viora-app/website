import React, {FC, useEffect, useState} from 'react';

import {SafeArea} from '../../components/Elements';
import Projects from '../../components/Projects';
import Form from '../../components/Forms/Project/Create';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';
import {useModal} from '../../hooks/useModal';
import {RouteParams} from '../../utils/types';

const modalProps = {
  title: 'Let the world know',
  description: 'and receive love and support',
};

const ProjectsScreen: FC<RouteParams> = ({route: {params}}) => {
  const {show} = useModal();
  const [hasModal, setHasModal] = useState(params && !!params.modal);
  useEffect(() => {
    if (hasModal) {
      setHasModal(false);
      show({
        content: <Form />,
        ...modalProps,
      });
    }
  }, [hasModal, show]);

  return (
    <SafeArea>
      <Projects />
      <ModalButton type={ButtonType.Add} modalContent={Form} {...modalProps} />
    </SafeArea>
  );
};

export default ProjectsScreen;

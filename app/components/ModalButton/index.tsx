'use client'

import React, {useCallback, FC} from 'react';

import {useModal} from '../../hooks/useModal';
import {IconButton} from '../../components/Elements';
import {ModalButtonProps} from './types';

const icons = {
  edit: 'feather',
  add: 'plus',
};

const ModalButton: FC<ModalButtonProps> = ({
  type,
  title,
  description = '',
  modalContent: Content,
  params = {},
}) => {
  const {show} = useModal();

  const showAddSongModal = useCallback(() => {
    show({
      title,
      description,
      content: <Content {...params} />,
    });
  }, [show, title, description, Content, params]);

  return (
    <IconButton
      iconName={icons[type]}
      iconSize={28}
      onPress={showAddSongModal}
    />
  );
};

export default ModalButton;

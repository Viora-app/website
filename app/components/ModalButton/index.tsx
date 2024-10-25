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
  unsafeScreen,
  params = {},
}) => {
  const {show} = useModal();
  const styles = {};

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
      style={[
        styles.button,
        styles.shadow,
        unsafeScreen ? styles.spacerDouble : styles.spacer,
      ]}
      onPress={showAddSongModal}
    />
  );
};

export default ModalButton;

import React from 'react';

import {ProjectStatus} from '../Projects/types';
import {useAccount} from '../../hooks/useAccount';
import Editable from './Editable';
import Readable from './Readable';

const Gallery = ({id, images, ownerId, projectStatus, refresh}) => {
  const {account} = useAccount();

  if (ownerId === account.id && projectStatus === ProjectStatus.Draft) {
    return <Editable id={id} images={images} refresh={refresh} />;
  }
  return <Readable id={id} images={images} />;
};

export default Gallery;

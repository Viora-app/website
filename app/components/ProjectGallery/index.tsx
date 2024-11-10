import React, {FC} from 'react';

import {ProjectStatus} from '../Projects/types';
// import {useAccount} from '@/app/hooks/useAccount';
// import Editable from './Editable';
import Readable from './Readable';
import {GalleryProps} from './types';

const Gallery: FC<GalleryProps> = ({id, images, ownerId, projectStatus, refresh}) => {
  const account = {}
  if (ownerId === account?.id && projectStatus === ProjectStatus.Draft) {
    // return <Editable id={id} images={images} refresh={refresh} />;
  }
  return <Readable id={id} images={images} />;
};

export default Gallery;

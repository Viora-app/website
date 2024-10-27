import React, {FC} from 'react';
import {Image} from '../../components/Polyfills';

import {RouteParams} from '../../utils/types';
import {SafeArea} from '../../components/Elements';
import largePlaceholder from '../../../public/images/gallerymain.png';

const PictureScreen: FC<RouteParams> = ({route: {params}}) => {
  const images = params?.uri ? params : largePlaceholder;

  return (
    <SafeArea>
      <Image alt="" source={images} />
    </SafeArea>
  );
};

export default PictureScreen;

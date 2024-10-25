import React, {FC} from 'react';
import ImageView from 'react-native-image-viewing';

import {RouteParams} from '../../utils/types';
import {SafeArea} from '../../components/Elements';
import largePlaceholder from '../../assets/images/gallerymain.png';

const PictureScreen: FC<RouteParams> = ({route: {params}, navigation}) => {
  const images = params?.uri ? [params] : [largePlaceholder];

  return (
    <SafeArea>
      <ImageView
        images={images}
        imageIndex={0}
        visible={true}
        onRequestClose={navigation.goBack}
      />
    </SafeArea>
  );
};

export default PictureScreen;

import React, {FC} from 'react';
import {View, Image, TouchableOpacity} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {getPreferredSize} from './utils';
import {GalleryProps, ReadableImageProps} from './types';
import {Routes} from '../../config/routes';

const ImageItem: FC<ReadableImageProps> = ({index, image}) => {
  const {push: navigate} = useRouter();
  const onPress = params => {
    if (params.uri) {
      navigate(Routes.Picture, params);
    }
  };

  const img = getPreferredSize(image?.attributes.formats, index);
  return (
    <TouchableOpacity
      disabled={typeof img === 'number'}
      onPress={() => onPress(img)}
      className={`${index === 0 ? 'flex-[4] h-full' : 'flex-1'} bg-[#FFEEFF] overflow-hidden ${typeof img === 'string' ? '' : 'flex flex-row justify-center items-center'}`}
      >
      <Image
        alt="Gallery photo"
        source={img}
        width={400}
        height={400}
        className={typeof img === 'string' ? 'w-full h-full object-cover' : ''}
      />
    </TouchableOpacity>
  );
};

const Readable: FC<GalleryProps> = ({images = []}) => {
  const formatImages = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);
  };

  return (
    <View className="p-5">
      <View className="flex w-full flex-row gap-2 rounded-xl overflow-hidden h-[500px]wrap">
        {formatImages().map((image, index) => (
          <ImageItem image={image} index={index} key={`image-${index}`} />
        ))}
      </View>
    </View>
  );
};

export default Readable;

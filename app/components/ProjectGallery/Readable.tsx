import React, {FC} from 'react';
import {View, Image, TouchableOpacity} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {getLargestSize} from '@/app/utils/image';
import {GalleryReadableProps, ReadableImageProps} from './types';
import {Routes} from '../../config/routes';

const ImageItem: FC<ReadableImageProps> = ({index, image}) => {
  const {push: navigate} = useRouter();
  const onPress = params => {
    if (params.uri) {
      navigate(Routes.Picture, params);
   }
 };

  const img = getLargestSize(image?.attributes.formats ?? {});
  return (
    <TouchableOpacity
      disabled={typeof img === 'number'}
      onPress={() => onPress(img)}
      className={`${index === 0 ? 'flex-[4] h-full' : 'flex-1'} bg-[#FFEEFF] overflow-hidden ${typeof img === 'string' ? '' : 'flex flex-row justify-center items-center'}`}
      >
      <Image
        alt="Gallery photo"
        source={img?.src}
        width={img?.width}
        height={img?.height}
        className="min-w-full min-h-full object-cover"
      />
    </TouchableOpacity>
  );
};

const Readable: FC<GalleryReadableProps> = ({images = []}) => {
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

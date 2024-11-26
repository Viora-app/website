'use client'

import React, {FC} from 'react';
import {View, Image} from '@/app/components/Polyfills';

import {Icon} from '@/app/components/Elements';
import {getLargestSize} from '@/app/utils/image';
import type {EditableImageProps} from './types';

const ImageItem: FC<EditableImageProps> = ({
  index,
  image,
  disabled,
  onRemove,
  onAdd,
}) => {
  const onPress = (event) => {
    event.preventDefault();
    if (image) {
      onRemove(index);
    } else {
      const file = (event.target as HTMLInputElement).files![0];
      const formData = new FormData();
      formData.append('files.images', file);
      formData.append('data', JSON.stringify({}));
      onAdd(formData);
    }
  };

  const img = getLargestSize(image?.attributes.formats ?? {});
  return (
    <label
      className={`${index === 0 ? 'flex-[4] h-full' : 'flex-1'} bg-[#FFEEFF] relative overflow-hidden ${typeof img === 'string' ? '' : 'flex flex-row justify-center items-center'}`}
      htmlFor={`image-item-${index}`}
      >
        <input
          className="text-[0px] invisible absolute"
          disabled={disabled}
          id={`image-item-${index}`}
          type="file"
          accept="image/*"
          onChange={onPress}
        />
      <Image
        alt="Some Photo"
        source={image ? img?.src : img?.src?.src}
        width={img?.src?.width}
        height={img?.src?.height}
        className="min-w-full min-h-full object-cover"
      />
      {image && (
        <View className="absolute left-2 top-2 bg-neutralPure rounded-md">
          <Icon name="cross" size={20} />
        </View>
      )}
    </label>
  );
};

export default ImageItem;
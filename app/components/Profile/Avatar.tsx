'use client'

import React, {useState, FC} from 'react';
import {View, Image} from '../Polyfills';

import {useAccount} from '../../hooks/useAccount';
import {useModal} from '../../hooks/useModal';
import {Icon, ImagePicker} from '../Elements';
import {finalMessages} from '../../utils/modal';
import {FetchStatus} from '../../config/types';
import {getSmallestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';
import type {FileEvent} from './types';

const Avatar: FC = () => {
  const {update, account} = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const {show, hide} = useModal();
  const image = getSmallestSize(
    account?.avatar?.formats ?? ({} as ImageFormats),
  );

  const onSelectImage = async (file: FileEvent) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('files.avatar', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    formData.append('data', JSON.stringify({}));
    // @ts-expect-error Form Data type is not properly defined.
    const result = await update(formData);

    show({
      ...finalMessages({
        status: result.success ? FetchStatus.success : FetchStatus.error,
        message: result.success
          ? 'Your avatar should be available soon'
          : 'Error uploading your avatar',
      }),
      onPrimaryPress: () => {
        setIsLoading(false);
        hide();
      },
    });
  };

  return (
    <View className="flex flex-row justify-center">
      <ImagePicker disabled={isLoading} onSelectImage={onSelectImage} className="w-[124px] h-[124px]">
        <Image alt="Profile picture" source={image} className="w-full relative z-0" />
        <Icon
          name="feather"
          size={32}
          color="#999"
          className="absolute z-10 right-1 bottom-1"
        />
      </ImagePicker>
    </View>
  );
};

export default Avatar;

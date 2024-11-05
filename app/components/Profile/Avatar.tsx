'use client'

import React, {useState, FC, useEffect} from 'react';
import {View, Image} from '../Polyfills';

import {useAccount} from '../../hooks/useAccount';
import {useModal} from '../../hooks/useModal';
import {Icon, ImagePicker} from '../Elements';
import {finalMessages} from '../../utils/modal';
import {FetchStatus} from '../../config/types';
import {getSmallestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';

const Avatar: FC = () => {
  const {update, account} = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const {show, hide} = useModal();
  const [image, setImage] = useState<Blob | null>(null);
  const source = getSmallestSize(
    account?.avatar?.formats ?? ({} as ImageFormats),
  );

  const submit = async () => {
    if (!isLoading && image) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('files.avatar', image);
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
          setImage(null);
          setIsLoading(false);
          hide();
        },
      });
    }
  };

  useEffect(() => {
    submit();
  }, [isLoading, image]);

  return (
    <View className="flex flex-row justify-center">
      <ImagePicker disabled={isLoading} onSelectImage={setImage} className="w-[124px] h-[124px]">
        <Image alt="Profile picture" source={source?.src} width={source?.width} height={source?.height}  className="w-full relative z-0" />
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

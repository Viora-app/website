import React, {useState} from 'react';
import {View, Image} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import {useModal} from '../../hooks/useModal';
import {Icon, ImagePicker} from '../Elements';
import {finalMessages} from '../../utils/modal';
import {FetchStatus} from '../../config/types';
import {getSmallestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';
import themedStyles from './styles';
import type {AvatarProps, FileEvent} from './types';

const Avatar = ({style}: AvatarProps) => {
  const styles = useTheme(themedStyles);
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
    // @ts-expect-error
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
    <View style={[styles.avatarWrapper, style]}>
      <ImagePicker disabled={isLoading} onSelectImage={onSelectImage}>
        <Image source={image} style={styles.avatar} />
        <Icon
          name="feather"
          size={32}
          style={styles.avatarEditIcon}
          color="#fff"
        />
      </ImagePicker>
    </View>
  );
};

export default Avatar;

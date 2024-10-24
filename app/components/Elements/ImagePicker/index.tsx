import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import {useModal} from '../../../hooks/useModal';
import {finalMessages} from '../../../utils/modal';
import {FetchStatus} from '../../../config/types';
import {ImagePickerProps} from './types';

const ImagePicker: FC<ImagePickerProps> = ({
  onSelectImage,
  style,
  children,
  disabled,
}) => {
  const {show} = useModal();
  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        show(
          finalMessages({
            status: FetchStatus.error,
            message: 'Failed to upload your profile avatar',
          }),
        );
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        const file = {
          uri: selectedAsset.uri,
          type: selectedAsset.type,
          name: selectedAsset.fileName,
        };
        onSelectImage(file);
      }
    });
  };

  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={pickImage}>
      {children}
    </TouchableOpacity>
  );
};

export default ImagePicker;

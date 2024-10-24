import React, {FC, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import {ENDPOINTS} from '../../config/endpoints';
import {FetchStatus} from '../../config/types';
import {finalMessages} from '../../utils/modal';
import {usePatchData, useDeleteData} from '../../hooks/useQuery';
import {useTheme} from '../../hooks/useTheme';
import {useModal} from '../../hooks/useModal';
import {Icon} from '../Elements';
import {getPreferredSize} from './utils';
import themedStyles from './styles';
import type {GalleryProps, ImageItemProps} from '../ProjectDetails/types';

const ImageItem: FC<ImageItemProps> = ({
  index,
  image,
  style,
  disabled,
  onRemove,
  onAdd,
}) => {
  const {show, hide} = useModal();
  const styles = useTheme(themedStyles);
  const onPress = () => {
    if (image) {
      show({
        title: 'Are you sure?',
        description: 'You are about to remove this picture',
        onPrimaryPress: () => {
          onRemove(index);
          hide();
        },
      });
    } else {
      onAdd();
    }
  };

  const img = getPreferredSize(image?.attributes.formats ?? {}, index);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.imageWrapper,
        index === 0 ? styles.galleryMain : styles.galleryOther,
        style,
      ]}>
      <Image source={img} style={styles.image} />
      <View style={styles.addRemoveIcon}>
        {image && <Icon name="cross" size={20} />}
      </View>
    </TouchableOpacity>
  );
};

const Editable: FC<GalleryProps> = ({images = [], id, refresh}) => {
  const styles = useTheme(themedStyles);
  const {show, hide} = useModal();
  const patch = usePatchData(ENDPOINTS.PROJECTS);
  const del = useDeleteData(ENDPOINTS.FILES);
  const [isLoading, setIsLoading] = useState(false);

  const onAdd = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        show(
          finalMessages({
            status: FetchStatus.error,
            message: 'Failed to upload your photo',
          }),
        );
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        const newImage = {
          uri: selectedAsset.uri,
          type: selectedAsset.type,
          name: selectedAsset.fileName,
        };

        const formData = new FormData();
        formData.append('files.images', newImage);
        formData.append('data', JSON.stringify({}));

        try {
          // Send the formData to the API
          const result = await patch.mutateAsync({
            id,
            data: formData,
          });

          const feedback = {
            status: FetchStatus.error,
            message: 'Error uploading your photos',
          };
          if (result.data) {
            feedback.status = FetchStatus.success;
            feedback.message = 'Your photos should be available soon';
            refresh();
          }

          show({
            ...finalMessages(feedback),
            onPrimaryPress: () => {
              setIsLoading(false);
              hide();
            },
          });
        } catch (error) {
          show(
            finalMessages({
              status: FetchStatus.error,
              message: 'Failed to upload your images.',
            }),
          );
        }
      }
    });
  };

  const onRemove = async (index: number) => {
    setIsLoading(true);
    const imageId = images[index].id;
    const remainingIds = images
      .map(item => item.id)
      .filter((_, i) => i !== index);
    const result = await patch.mutateAsync({
      id,
      data: {
        images: remainingIds,
      },
    });
    await del.mutate({id: imageId});
    setIsLoading(false);
    if (result.data) {
      refresh();
    }
  };

  // Format images array to always have 5 items (either images or placeholders)
  const formatImages = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);
  };

  return (
    <View style={[styles.galleryWrapper, styles.spacer]}>
      {formatImages().map((image, index) => (
        <ImageItem
          image={image}
          disabled={isLoading}
          onRemove={onRemove}
          onAdd={onAdd}
          index={index}
          key={`image-${index}`}
        />
      ))}
    </View>
  );
};

export default Editable;

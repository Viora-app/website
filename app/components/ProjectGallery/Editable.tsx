import React, {FC, useState} from 'react';
import {View, Image} from '@/app/components/Polyfills';

import {ENDPOINTS} from '@/app/config/endpoints';
import {FetchStatus} from '@/app/config/types';
import {finalMessages} from '@/app/utils/modal';
import {usePatchData, useDeleteData} from '@/app/hooks/useQuery';
import {useModal} from '@/app/hooks/useModal';
import {Icon} from '@/app/components/Elements';
import {getLargestSize} from '@/app/utils/image';
import type {GalleryEditableProps, EditableImageProps} from './types';

const ImageItem: FC<EditableImageProps> = ({
  index,
  image,
  disabled,
  onRemove,
  onAdd,
}) => {
  const {show, hide} = useModal();
  const onPress = (event) => {
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
      onAdd(event);
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

const Editable: FC<GalleryEditableProps> = ({images = [], id, refresh}) => {
  const {show, hide} = useModal();
  const patch = usePatchData(ENDPOINTS.PROJECTS);
  const del = useDeleteData(ENDPOINTS.FILES);
  const [isLoading, setIsLoading] = useState(false);

  const onAdd = async (event) => {
    const file = (event.target as HTMLInputElement).files![0];
   
    const formData = new FormData();
    formData.append('files.images', file);
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
    } catch (err) {
      console.log(err);
      show(
        finalMessages({
          status: FetchStatus.error,
          message: 'Failed to upload your images.',
        }),
      );
    }
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
    <View className="p-5">
      <View className="flex w-full flex-row gap-2 rounded-xl overflow-hidden h-[500px] wrap">
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
    </View>
  );
};

export default Editable;

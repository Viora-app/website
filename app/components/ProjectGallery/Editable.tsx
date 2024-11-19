import React, {FC} from 'react';
import {View} from '@/app/components/Polyfills';

import {addProjectPhoto, deleteProjectPhoto} from '@/app/utils/api';
import ImageItem from './EditableItem';
import type {GalleryEditableProps} from './types';

const Editable: FC<GalleryEditableProps> = ({images = [], id, refresh}) => {
  const onAdd = async (formData) => {
    const result = await addProjectPhoto(id, formData);
    if (result.data) {
      refresh();
    }
  };

  const onRemove = async (index: number) => {
    const imageId = images[index].id;
    const remainingIds = images
      .map(item => item.id)
      .filter((_, i) => i !== index);
    const result = await deleteProjectPhoto(id, imageId, remainingIds);
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

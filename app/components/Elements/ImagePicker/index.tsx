'use client'
import React, {FC, useState, useEffect} from 'react';

import {ImagePickerProps} from './types';

const ImagePicker: FC<ImagePickerProps> = ({
  onSelectImage,
  children,
  disabled,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the image
    } else {
      console.log('No file was selected');
    }
  };

  useEffect(() => {
    if (selectedImage) {
      onSelectImage(selectedImage);
    }
  }, [selectedImage, onSelectImage]);

  return (
    <label for="image-selector">
      <input
        disabled={disabled}
        id="image-selector"
        type="file"
        accept="image/*"
        onChange={pickImage}
      />
      {children}
    </label>
  );
};

export default ImagePicker;

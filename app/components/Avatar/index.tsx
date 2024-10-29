import React from 'react';

import {View, Image} from '../Polyfills';
import type {AvatarProps} from './types';
import {avatars} from './assets';

const Avatar = ({className, id = 0, size = 124}: AvatarProps) => {
  const index = id % (avatars.length - 1);
  return (
    <View className={className}>
      <Image source={avatars[index]} width={size} alt="Avatar" />
    </View>
  );
};

export default Avatar;
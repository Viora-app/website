import React, {FC} from 'react';

import {H4, View, Image} from '../Polyfills';
import loading from '../../../public/images/loading.svg';
import {LoadingProps} from './types';

const Loading: FC<LoadingProps> = () => {
  return (
    <View className="w-full h-full flex flex-row justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <Image alt="Loading" source={loading} className="animate-spin" />
        <H4 className="mt-6 text-neutralSteady">Loading</H4>
      </View>
    </View>
  );
};
export default Loading;

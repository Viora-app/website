import React, {FC} from 'react';
import {Text, View, Image} from '../Polyfills';

import loading from '../../../public/images/loading.png';
import {LoadingProps} from './types';

const Loading: FC<LoadingProps> = () => {
  return (
    <View>
      <Image alt="" source={loading} />
      <Text>Loading</Text>
    </View>
  );
};
export default Loading;

import React, {FC, useRef, useEffect} from 'react';
import {Text, View} from '../Polyfills';

import loading from '../../../public/images/loading.png';
import {LoadingProps} from './types';

const Loading: FC<LoadingProps> = ({wrapper = 'screen'}) => {
  const styles = {};

  return (
    <View style={[styles.wrapper, styles[wrapper]]}>
      <Text style={styles.title}>Loading</Text>
    </View>
  );
};
export default Loading;

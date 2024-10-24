import React, {FC, useRef, useEffect} from 'react';
import {Text, View, Animated, Easing} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';
import loading from '../../assets/images/loading.png';
import {LoadingProps} from './types';

const Loading: FC<LoadingProps> = ({wrapper = 'screen'}) => {
  const styles = useTheme(themedStyles);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();

    return () => rotateAnimation.stop();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.wrapper, styles[wrapper]]}>
      <Animated.Image
        source={loading}
        style={[styles.spacer, {transform: [{rotate}]}]}
      />
      <Text style={styles.title}>Loading</Text>
    </View>
  );
};
export default Loading;

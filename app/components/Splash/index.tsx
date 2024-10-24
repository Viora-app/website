import React from 'react';
import {View, Image} from 'react-native';

import appLogo from '../../assets/images/IconText.png';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

const Splash = () => {
  const styles = useTheme(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={appLogo} resizeMode="cover" />
      </View>
    </View>
  );
};

export default Splash;

import React from 'react';
import {View, Image} from '../Polyfills';

import appLogo from '../../../public/images/IconText.png';

const Splash = () => {
  const styles = {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={appLogo} resizeMode="cover" />
      </View>
    </View>
  );
};

export default Splash;

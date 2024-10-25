import React from 'react';
import {View, Text, Image} from '../Polyfills';
import pkg from '../../../package.json';
import logo from '../../../public/images/applogo.png';

const About = () => {
  const styles = {};
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.title}>Viora</Text>
      <Text style={styles.version}>{`Version: ${pkg.version}`}</Text>
    </View>
  );
};

export default About;

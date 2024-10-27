import React from 'react';
import {View, Text, Image} from '../Polyfills';
import pkg from '../../../package.json';
import logo from '../../../public/images/applogo.png';

const About = () => {
  return (
    <View>
      <Image alt="" source={logo} />
      <Text>Viora</Text>
      <Text>{`Version: ${pkg.version}`}</Text>
    </View>
  );
};

export default About;

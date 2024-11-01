import React from 'react';
import {View, H1, H4, Image} from '../Polyfills';
import pkg from '../../../package.json';
import logo from '../../../public/images/applogo.png';

const About = () => {
  return (
    <View>
      <Image alt="App Logo" source={logo} />
      <H1>Viora</H1>
      <H4>{`Version: ${pkg.version}`}</H4>
    </View>
  );
};

export default About;

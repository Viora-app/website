/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableHighlight, Linking} from '../../Polyfills';
import {Icon} from '../index';
import {fonts} from '../../../config/stylesGuides';
import {OptionProps} from './types';

const Option = ({
  title, state, href, onPress, style, icon = 'rightChev',
}: OptionProps) => {
  const styles = {};
  if (!icon && href) {
    icon = 'link';
  }

  if (href && !onPress) {
    onPress = () => {
      Linking.openURL(href);
    };
  }

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={onPress}
      style={[styles.container, styles.rowNoWrap, style]}>
      <>
        <View style={styles.titleWrapper}>
          <Text style={[fonts.h4, styles.title]}>{title}</Text>
        </View>
        <View style={styles.rowNoWrap}>
          <Text style={[fonts.base, styles.state]}>{state}</Text>
          <View style={styles.iconWrapper}>
            <Icon name={icon} style={styles.icon} />
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default Option;

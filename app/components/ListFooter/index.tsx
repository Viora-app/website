import React from 'react';
import {View, ActivityIndicator} from '../Polyfills';
import {colors} from '../../config/stylesGuides';

export const ListFooter = ({isLoading}: {isLoading: boolean}) => {
  const styles = {};
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        size="large"
        color={
          isLoading ? colors.light.secondaryStrong : colors.light.primaryStrong
        }
      />
    </View>
  );
};

export default ListFooter;

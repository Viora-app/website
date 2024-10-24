import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '../../config/stylesGuides';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

export const ListFooter = ({isLoading}: {isLoading: boolean}) => {
  const styles = useTheme(themedStyles);
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

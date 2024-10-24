import React, {FC} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '../../../hooks/useTheme';
import {SafeAreaProps} from './types';
import themedStyles from './styles';

const SafeArea: FC<SafeAreaProps> = ({children, safeArea}) => {
  const styles = useTheme(themedStyles);
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View
      style={[
        styles.screenContainer,
        styles.projectsScreen,
        safeArea ? safeAreaStyle : null,
      ]}>
      {children}
    </View>
  );
};

export default SafeArea;

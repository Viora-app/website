import React, {FC} from 'react';
import {Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ButtonThemes} from '../Elements/Button/types';
import {Button} from '../Elements';
import {Routes} from '../../config/routes';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';
import {ScreenNotFoundProps} from './types';
import cactus from '../../assets/images/cactus.png';

const ScreenNotFound: FC<ScreenNotFoundProps> = ({redirectTo}) => {
  const styles = useTheme(themedStyles);
  const navigation = useNavigation();

  const goHome = () => {
    if (redirectTo && redirectTo in Routes) {
      navigation.navigate(Routes[redirectTo] as never);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Image source={cactus} style={styles.spacer} />
      <Text style={styles.title}>Uh-oh!</Text>
      <Text style={[styles.title, styles.spacer]}>We couldn't find it</Text>
      {redirectTo && (
        <View style={styles.actionBar}>
          <Button
            title="Back to home"
            theme={ButtonThemes.primary}
            onPress={goHome}
          />
        </View>
      )}
    </View>
  );
};
export default ScreenNotFound;

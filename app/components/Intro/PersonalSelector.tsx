import React from 'react';
import {View, Text, Image} from 'react-native';

import logo from '../../assets/images/applogo.png';
import {Button} from '../Elements';
import {ButtonThemes} from '../Elements/Button/types';
import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';

const PersonaSelector = ({onSelect}) => {
  const styles = useTheme(themedStyles);

  return (
    <View style={[styles.container, styles.column, styles.justifyBetween]}>
      <View style={styles.spacer} />
      <View style={[styles.row, styles.alignCenter, styles.justifyCenter]}>
        <Image source={logo} />
      </View>
      <View style={[styles.column, styles.alignCenter, styles.justifyCenter]}>
        <Text style={styles.largest}>Welcomer to Viora</Text>
        <Text style={[styles.semi, styles.spacer]}>
          Are you joining as an artist or a fan?
        </Text>
      </View>
      <View style={styles.fullWidth}>
        <Button
          title="Artist"
          theme={ButtonThemes.primary}
          onPress={() => onSelect('artist')}
          wrapperStyle={styles.spacerMini}
        />
        <Button
          title="Fan"
          theme={ButtonThemes.primary}
          onPress={() => onSelect('fan')}
        />
      </View>
      <View style={styles.spacer} />
    </View>
  );
};

export default PersonaSelector;

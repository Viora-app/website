import React from 'react';
import {View, TouchableHighlight} from '../Polyfills';
import {usePresets} from '../../hooks/usePresets';
import {Icon} from '../Elements';
import {colors} from '../../config/stylesGuides';

const RouteButton = ({route, navigation, stateIndex, index}: any) => {
  const {presets} = usePresets();
  const styles = {};
  const isFocused = stateIndex === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // Navigate to the tab if it's not focused already
      navigation.navigate(route.name);
    }
  };

  const iconColor = isFocused
    ? colors[presets.theme].primaryStrong
    : colors[presets.theme].neutralTender;

  return (
    <TouchableHighlight
      onPress={onPress}
      key={route.key}
      underlayColor="transparent"
      style={styles.tab}>
      <View style={styles.iconWrapper}>
        <Icon name={route.name.replace(' ', '')} color={iconColor} />
      </View>
    </TouchableHighlight>
  );
};

export default RouteButton;

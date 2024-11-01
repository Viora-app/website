import React from 'react';
import {View} from '../Polyfills';
import {usePresets} from '../../hooks/usePresets';
import {Themes} from '../../hooks/usePresets/types';
import {CheckBox} from '../Elements';

const SelectTheme = () => {
  const {presets, storePresets} = usePresets();

  const onSelect = async (theme: Themes) => {
    await storePresets({theme});
  };

  return (
    <View className="w-full pt-4">
      <CheckBox
        title="Light"
        onSelect={() => onSelect(Themes.light)}
        selected={presets.theme === Themes.light}
      />
      <CheckBox
        title="Dark"
        onSelect={() => onSelect(Themes.dark)}
        selected={presets.theme === Themes.dark}
      />
    </View>
  );
};

export default SelectTheme;

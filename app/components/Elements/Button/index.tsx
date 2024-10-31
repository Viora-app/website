import React from 'react';
import {TouchableHighlight, H4} from '../../Polyfills';
import {ButtonProps, ButtonThemes} from './types';

const Button = ({
  onPress,
  title,
  disabled,
  theme,
}: ButtonProps) => {
  const config = {
    wrapper: 'bg-primaryStrong hover:shadow-xl',
    text: 'text-neutralPure',
  };
  if (theme === ButtonThemes.secondary) {
    config.wrapper = 'bg-neutralPure border border-neutralSteady hover:shadow-xl';
    config.text = 'text-neutralStrong';
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      className={`rounded-md min-w-[200px] text-center h-[50px] cursor-pointer ${config.wrapper}`}
    >
      <H4 className={`!font-light !pb-0 leading-[50px] ${config.text}`}>{title}</H4>
    </TouchableHighlight>
  );
};

export default Button;

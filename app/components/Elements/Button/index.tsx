import React from 'react';
import {TouchableHighlight, H4} from '../../Polyfills';
import {ButtonProps} from './types';

const Button = ({
  onPress,
  title,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      className="rounded-md min-w-[200px] text-center bg-primaryStrong hover:shadow-xl h-[50px] cursor-pointer"
    >
      <H4 className="text-neutralPure !font-light !pb-0 leading-[50px]">{title}</H4>
    </TouchableHighlight>
  );
};

export default Button;

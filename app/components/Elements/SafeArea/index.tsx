import React, { FC } from 'react';

import { SafeAreaProps } from './types';

const SafeArea: FC<SafeAreaProps> = ({ children }) => {
  return (
    <div className="w-full h-full md:max-w-[600px] max-h-[900px]">
      {children}
    </div>
  );
};

export default SafeArea;

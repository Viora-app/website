import React, { FC } from 'react';

import { SafeAreaProps } from './types';

const SafeArea: FC<SafeAreaProps> = ({ children }) => {
  return (
    <div className="w-full h-full max-h-[900px] bg-secondaryMild">
      {children}
    </div>
  );
};

export default SafeArea;

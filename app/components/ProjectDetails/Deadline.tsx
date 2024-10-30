import React, {FC} from 'react';

import {DeadlineProps} from './types';
import {View, H3, Span, Image} from '../Polyfills';
import icon from '../../../public/images/deatlineicon.png';

const Deadline: FC<DeadlineProps> = ({date}) => {
  return (
    <View className="w-full flex flex-row items-center bg-skyWeak rounded-md p-4 my-6">
      <Image
        alt="Deadline icon"
        source={icon}
        className="w-[40px] h-[40px]"
        width={40}
        height={40}
      />
      <View className="flex flex-col pl-4">
        <Span className="text-primaryStrong">Deadline</Span>
        <H3 className="text-primaryStrong !font-normal">{date}</H3>
      </View>
    </View>
  );
};

export default Deadline;

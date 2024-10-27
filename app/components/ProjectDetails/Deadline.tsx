import React, {FC} from 'react';
import {View, Text, Image} from '../Polyfills';

import {DeadlineProps} from './types';
import icon from '../../../public/images/deatlineicon.png';

const Deadline: FC<DeadlineProps> = ({date}) => {
  return (
    <View>
      <Image alt="" source={icon} />
      <View>
        <Text>Deadline</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

export default Deadline;

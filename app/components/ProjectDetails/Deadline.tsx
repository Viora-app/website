import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

import {DeadlineProps} from './types';
import icon from '../../../public/images/deatlineicon.png';

const Deadline: FC<DeadlineProps> = ({date}) => {
  const styles = {};

  return (
    <View style={[styles.row, styles.deadlineWrapper, styles.spacer]}>
      <Image source={icon} style={styles.deadlineIcon} />
      <View>
        <Text style={styles.base}>Deadline</Text>
        <Text style={styles.large}>{date}</Text>
      </View>
    </View>
  );
};

export default Deadline;

import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import {DeadlineProps} from './types';
import themedStyles from './styles';
import icon from '../../assets/images/deatlineicon.png';

const Deadline: FC<DeadlineProps> = ({date}) => {
  const styles = useTheme(themedStyles);

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

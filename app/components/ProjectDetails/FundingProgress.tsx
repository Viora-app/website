import React, {FC} from 'react';
import {View, Text, ImageBackground} from 'react-native';

import {useTheme} from '../../hooks/useTheme';
import {FundingProgressProps} from './types';
import themedStyles from './styles';
import stripePattern from '../../assets/images/stripespattern.png';
import {fromBaseToken} from '../../utils/formatters';

const FundingProgress: FC<FundingProgressProps> = ({
  currentFunding,
  softGoal,
  hardGoal,
  style,
}) => {
  const styles = useTheme(themedStyles);
  const fundingPercentage = Math.floor((100 * currentFunding) / hardGoal);
  const softCapPercentage = Math.floor((100 * softGoal) / hardGoal);
  const successPercentage = Math.floor((100 * currentFunding) / softGoal);

  return (
    <View style={[styles.progressWrapper, style]}>
      <View style={styles.row}>
        <View style={styles.percentageWrapper}>
          <Text style={[styles.small, styles.tender]}>Progress</Text>
          <Text
            style={[
              styles.largest,
              styles.percentage,
            ]}>{`${successPercentage}%`}</Text>
        </View>
        <View style={styles.goalsWrapper}>
          <View style={[styles.row, styles.alignCenter]}>
            <Text style={[styles.small, styles.reassureMild]}>Goal:&nbsp;</Text>
            <Text style={[styles.large, styles.reassureMild]}>
              {fromBaseToken(softGoal, 2, true)}
            </Text>
          </View>
          <View style={[styles.row, styles.alignCenter]}>
            <Text style={[styles.small, styles.zero]}>
              Max acceptable:&nbsp;
            </Text>
            <Text style={[styles.base, styles.zero]}>
              {fromBaseToken(hardGoal, 2, true)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.barWrapper}>
        <View style={[styles.softCap, {width: `${softCapPercentage}%`}]} />
        <View style={[styles.hardCap, {width: `${fundingPercentage}%`}]}>
          <ImageBackground
            source={stripePattern}
            resizeMode="repeat"
            style={styles.stripe}
          />
        </View>
      </View>
    </View>
  );
};

export default FundingProgress;

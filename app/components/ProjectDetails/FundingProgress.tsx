import React, {FC} from 'react';
import {View, Text, ImageBackground} from '../Polyfills';

import {FundingProgressProps} from './types';
import stripePattern from '../../../public/images/stripespattern.png';
import {fromBaseToken} from '../../utils/formatters';

const FundingProgress: FC<FundingProgressProps> = ({
  currentFunding,
  softGoal,
  hardGoal,
}) => {
  const fundingPercentage = Math.floor((100 * currentFunding) / hardGoal);
  const softCapPercentage = Math.floor((100 * softGoal) / hardGoal);
  const successPercentage = Math.floor((100 * currentFunding) / softGoal);

  return (
    <View>
      <View>
        <View>
          <Text>Progress</Text>
          <Text>{`${successPercentage}%`}</Text>
        </View>
        <View>
          <View>
            <Text>Goal:&nbsp;</Text>
            <Text>
              {fromBaseToken(softGoal, 2, true)}
            </Text>
          </View>
          <View>
            <Text>
              Max acceptable:&nbsp;
            </Text>
            <Text>
              {fromBaseToken(hardGoal, 2, true)}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{width: `${softCapPercentage}%`}} />
        <View style={{width: `${fundingPercentage}%`}}>
          <ImageBackground
            source={stripePattern}
            resizeMode="repeat"
            alt=""
          />
        </View>
      </View>
    </View>
  );
};

export default FundingProgress;

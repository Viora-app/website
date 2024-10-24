import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {useGetData} from '../../../../hooks/useQuery';
import {ENDPOINTS} from '../../../../config/endpoints';
import {Button} from '../../../Elements';
import Loading from '../../../Loading';
import {ButtonThemes} from '../../../Elements/Button/types';
import ContributionReview from './Review';
import {
  ContributeProps,
  ContributeOptionProps,
  ContributionTier,
} from './types';
import themedStyles from './styles';

const Option: FC<ContributeOptionProps> = ({data, selected, onSelected}) => {
  const styles = useTheme(themedStyles);
  const onPress = () => onSelected(data.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.column,
        styles.contributeOption,
        styles.spacerMini,
        selected ? styles.selectedOption : null,
      ]}>
      <View style={[styles.row, styles.spacerMini, styles.justifyBetween]}>
        <Text
          style={[
            styles.semi,
            selected ? styles.reassureStrong : styles.strong,
          ]}>
          {data.attributes.name}
        </Text>
        <Text
          style={[
            styles.optionAmount,
            selected ? styles.selectedAmount : styles.normalAmount,
          ]}>{`${data.attributes.amount} ${TOKEN_SYMBOL}`}</Text>
      </View>
      <Text style={[styles.medium, selected ? styles.tender : styles.mild]}>
        {data.attributes.rewards}
      </Text>
    </TouchableOpacity>
  );
};

const Contribute: FC<ContributeProps> = ({projectId, refresh}) => {
  const styles = useTheme(themedStyles);
  const {show} = useModal();
  const [selected, setSelected] = useState<string>('');
  const {data, isLoading} = useGetData(ENDPOINTS.CONTRIBUTION_TIERS, {
    filters: {project: projectId},
  });
  const options: ContributionTier[] = data ? data.data : [];

  const onSubmit = () => {
    const optionData = options.find(item => item.id === selected);
    if (optionData) {
      const props = {
        id: optionData.id,
        projectId,
        data: {
          amount: optionData.attributes.amount,
          name: optionData.attributes.name,
          rewards: optionData.attributes.rewards,
        },
      };
      show({
        title: 'Good choice',
        description: '',
        content: <ContributionReview {...props} refresh={refresh} />,
      });
    }
  };

  return (
    <View style={[styles.column, styles.justifyCenter, styles.alignCenter]}>
      <View style={[styles.column, styles.spacerMini, styles.optionsWrapper]}>
        {isLoading && !options.length && <Loading wrapper="section" />}
        {options.map(item => (
          <Option
            key={`${item.id}${item.name}`}
            data={item}
            selected={selected === item.id}
            onSelected={setSelected}
          />
        ))}
      </View>
      <Button
        title="Continue"
        theme={ButtonThemes.primary}
        onPress={onSubmit}
      />
    </View>
  );
};

export default Contribute;

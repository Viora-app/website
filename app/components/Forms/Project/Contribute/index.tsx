import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {useGetData} from '@/app/hooks/useQuery';
import {ENDPOINTS} from '@/app/config/endpoints';
import {Button} from '@/app/components/Elements';
import Loading from '../../../Loading';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import ContributionReview from './Review';
import {
  ContributeProps,
  ContributeOptionProps,
  ContributionTier,
} from './types';

const Option: FC<ContributeOptionProps> = ({data, selected, onSelected}) => {
  const onPress = () => onSelected(data.id);

  return (
    <TouchableOpacity
      onPress={onPress}>
      <View>
        <Text>{selected ? 'X' : 'O'}</Text>
        <Text>
          {data.attributes.name}
        </Text>
        <Text>{`${data.attributes.amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`}</Text>
      </View>
      <Text>
        {data.attributes.rewards}
      </Text>
    </TouchableOpacity>
  );
};

const Contribute: FC<ContributeProps> = ({projectId, refresh}) => {
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
    <View>
      <View>
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

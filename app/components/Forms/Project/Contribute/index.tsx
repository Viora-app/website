'use client'

import React, {FC, useState} from 'react';

import {View} from '@/app/components/Polyfills';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {ContributeProps} from './types';
import Option from './Option';

const Contribute: FC<ContributeProps> = ({projectId, options}) => {
  const [selected, setSelected] = useState<string>('');

  const handleSubmit = () => {
    const optionData = options.find(item => item.id === selected);
    // @todo Call the action function
    console.log('optionData', projectId, optionData);
  };

  return (
    <View>
      <View>
        {options.map(item => (
          <Option
            key={`${item.id}${item.attributes.name}`}
            data={item}
            selected={selected === item.id}
            onSelected={setSelected}
          />
        ))}
      </View>
      <Button
        title="Continue"
        theme={ButtonThemes.primary}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Contribute;

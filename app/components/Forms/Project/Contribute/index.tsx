'use client'

import React, {FC, useState} from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import SectionHeader from '@/app/components/SectionHeader';
import {ContributeProps} from './types';
import Option from './Option';

const Contribute: FC<ContributeProps> = ({project, artist, options}) => {
  const [selected, setSelected] = useState<string>('');

  const handleSubmit = () => {
    const optionData = options.find(item => item.id === selected);
    // @todo Call the action function
    console.log('optionData', project.id, optionData);
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title={`Support ${artist.attributes.first_name}`}
        subtitle={`You are contributing to "${project.attributes.name}"`}
      />
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
    </ScrollView>
  );
};

export default Contribute;

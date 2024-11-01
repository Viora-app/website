'use client'

import React, {useState} from 'react';

import {useModal} from '../../../../hooks/useModal';
import {validateForm} from '../../../../utils/validators';
import {ProjectAttrs, ProjectType} from '../../../Projects/types';
import ValidationFeedback from '../../../FormElements/ValidationFeedback';
import {View, ScrollView} from '../../../Polyfills';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button, Input} from '../../../Elements';
import CreateProjectReview from './Review';
import {schema} from './schema';

const CreateProjectForm = () => {
  const [data, setData] = useState<Partial<ProjectAttrs>>({
    name: 'To Be Deleted',
    summary: 'A powerful and energetic single that captures the vibrant nightlife of a bustling metropolis.',
    description: 'To Be Deleted is a single that blends electronic dance music with urban beats to create a high-energy anthem for the night. With driving bass lines, infectious rhythms, and futuristic sound design, this track is a tribute to the non-stop energy of city life after dark. The lyrics capture the thrill and excitement of midnight adventures, making it a perfect addition to any party playlist. This single represents the pulse of the modern world, set against the backdrop of a vibrant, neon-lit cityscape.',
    project_type: ProjectType.Single,
    planned_release_date: '2024-11-01',
    soft_goal: 1,
    hard_goal: 2,
    deadline: '2024-11-01',
  });
  const {show} = useModal();

  const onSubmit = async () => {
    // Keyboard.dismiss();
    show({
      title: 'Looking good!',
      description: '',
      content: <CreateProjectReview data={data} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const validity = validateForm(schema, data);

  return (
    <View className="w-full h-[calc(100%-160px)]">
      <ScrollView className="w-full h-full">
        <Input
          placeholder="Name"
          onChange={onChange}
          value={data.name}
          name="name"
        />
        <Input
          placeholder="Summary (70-140 characters)"
          onChange={onChange}
          value={data.summary}
          name="summary"
          multiline
        />
        <Input
          placeholder="Description (Min 140 characters)"
          onChange={onChange}
          value={data.description}
          name="description"
          multiline
        />
        <Input
          placeholder="Planned release date (YYYY-MM-DD)"
          onChange={onChange}
          value={data.planned_release_date}
          name="planned_release_date"
        />
        <Input
          placeholder={`Soft goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={String(data.soft_goal)}
          name="soft_goal"
          inputMode="decimal"
        />
        <Input
          placeholder={`Hard goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={String(data.hard_goal)}
          name="hard_goal"
          inputMode="decimal"
        />
        <Input
          placeholder="Funding deadline (YYYY-MM-DD)"
          onChange={onChange}
          value={data.deadline}
          name="deadline"
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View className="w-full flex flex-row justify-center pt-4">
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </View>
  );
};

export default CreateProjectForm;

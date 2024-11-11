'use client';

import React, {useState, FC} from 'react';
import {useRouter} from 'next/navigation';

import {validateForm} from '@/app/utils/validators';
import {ProjectAttrs, ProjectType} from '@/app/components/Projects/types';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {View, ScrollView} from '@/app/components/Polyfills';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import SectionHeader from '@/app/components/SectionHeader';
import {schema} from './schema';
import {CreateProjectFormProps} from './types';
import { Routes } from '@/app/config/routes';

const emptyFormValues = {
  name: 'It\'s pouring rain',
  summary:
    'A powerful and energetic single that captures the vibrant nightlife of a bustling metropolis.',
  description:
    'It\'s pouring rain is a single that blends electronic dance music with urban beats to create a high-energy anthem for the night. With driving bass lines, infectious rhythms, and futuristic sound design, this track is a tribute to the non-stop energy of city life after dark. The lyrics capture the thrill and excitement of midnight adventures, making it a perfect addition to any party playlist. This single represents the pulse of the modern world, set against the backdrop of a vibrant, neon-lit cityscape.',
  project_type: ProjectType.Single,
  planned_release_date: '2024-12-01',
  soft_goal: 0.1,
  hard_goal: 0.2,
  deadline: '2024-12-01',
};

const CreateProjectForm: FC<CreateProjectFormProps> = ({
  initialData,
  onProceed,
}) => {
  const {push} = useRouter();
  const [data, setData] = useState<Partial<ProjectAttrs>>(
    initialData || emptyFormValues,
  );
  const validity = validateForm(schema, data);

  const handleSubmit = () => {
    onProceed(data);
  };

  const handleCancel = () => {
    push(Routes.Home);
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title="Let the world know"
        subtitle="and receive love and support"
      />
      <View>
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
      </View>
      <ValidationFeedback {...validity} />
      <View className="w-full flex flex-row justify-center gap-4 pt-4">
        <Button
          title="Cancel"
          theme={ButtonThemes.secondary}
          onPress={handleCancel}
        />
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={handleSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </ScrollView>
  );
};

export default CreateProjectForm;

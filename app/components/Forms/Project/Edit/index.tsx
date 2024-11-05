'use client'

import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions} from '@/app/components/Polyfills';

import {ENDPOINTS} from '@/app/config/endpoints';
import {mapObject} from '@/app/utils/convertors';
import {useModal} from '@/app/hooks/useModal';
import {useGetData} from '@/app/hooks/useQuery';
import {validateForm} from '@/app/utils/validators';
import {ProjectAttrs, ProjectType} from '../../../Projects/types';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import EditProjectReview from './Review';
import type {EditProjectFormProps} from './types';
import {schema} from './schema';

const EditProjectForm = ({id}: EditProjectFormProps) => {
  const [data, setData] = useState<Partial<ProjectAttrs>>({
    name: '',
    summary: '',
    description: '',
    project_type: ProjectType.Single,
    planned_release_date: '',
    soft_goal: 0,
    deadline: '',
    hard_goal: 0,
  });
  const {data: existingData, isLoading} = useGetData(
    `${ENDPOINTS.PROJECTS}/${id}`,
  );
  const {show} = useModal();
  const maxHeight = Dimensions.get('window').height * 0.6;

  const onSubmit = async () => {
    if (id) {
      // Keyboard.dismiss();
      show({
        title: 'Looking good!',
        description: '',
        content: <EditProjectReview data={data} id={id} />,
      });
    }
  };

  const onChange = (fieldName: string) => (value: string) => {
    const currentFieldValue = data[fieldName as keyof ProjectAttrs];
    const parsedValue =
      typeof currentFieldValue === 'number' ? parseFloat(value) || 0 : value;
    setData({
      ...data,
      [fieldName]: parsedValue,
    });
  };

  const validity = validateForm(schema, data);

  useEffect(() => {
    if (existingData?.data && !isLoading) {
      setData(
        mapObject(existingData.data.attributes, [
          'name',
          'summary',
          'description',
          'project_type',
          'planned_release_date',
          'soft_goal',
          'deadline',
          'hard_goal',
        ]),
      );
    }
  }, [existingData, isLoading]);

  return (
    <View>
      <ScrollView style={{maxHeight}}>
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
          inputMode="numeric"
        />
        <Input
          placeholder={`Hard goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={String(data.hard_goal)}
          name="hard_goal"
          inputMode="numeric"
        />
        <Input
          placeholder="Funding deadline (YYYY-MM-DD)"
          onChange={onChange}
          value={data.deadline}
          name="deadline"
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View>
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid || !id}
        />
      </View>
    </View>
  );
};

export default EditProjectForm;

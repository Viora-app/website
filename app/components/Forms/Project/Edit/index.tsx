import React, {useEffect, useState} from 'react';
import {View, Keyboard, ScrollView, Dimensions} from 'react-native';
import {TOKEN_SYMBOL} from '@env';

import {ENDPOINTS} from '../../../../config/endpoints';
import {mapObject} from '../../../../utils/convertors';
import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {useGetData} from '../../../../hooks/useQuery';
import {validateForm} from '../../../../utils/validators';
import {ProjectAttrs, ProjectType} from '../../../Projects/types';
import ValidationFeedback from '../../../FormElements/ValidationFeedback';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button, Input} from '../../../Elements';
import EditProjectReview from './Review';
import type {EditProjectFormProps} from './types';
import {schema} from './schema';
import themedStyles from './styles';

const EditProjectForm = ({style, id}: EditProjectFormProps) => {
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
  const styles = useTheme(themedStyles);
  const maxHeight = Dimensions.get('window').height * 0.6;

  const onSubmit = async () => {
    if (id) {
      Keyboard.dismiss();
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
    <View style={style}>
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
          placeholder={`Soft goal (in ${TOKEN_SYMBOL})`}
          onChange={onChange}
          value={String(data.soft_goal)}
          name="soft_goal"
          inputMode="numeric"
        />
        <Input
          placeholder={`Hard goal (in ${TOKEN_SYMBOL})`}
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
      <View style={styles.actionBar}>
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

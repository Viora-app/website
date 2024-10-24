import React, {FC, useState} from 'react';
import {View, Keyboard, ScrollView, Dimensions, Text} from 'react-native';

import {useTheme} from '../../../../hooks/useTheme';
import {useModal} from '../../../../hooks/useModal';
import {useGetData} from '../../../../hooks/useQuery';
import {validateForm} from '../../../../utils/validators';
import {ENDPOINTS} from '../../../../config/endpoints';
import ValidationFeedback from '../../../FormElements/ValidationFeedback';
import {ButtonThemes} from '../../../Elements/Button/types';
import {Button, Input, CheckBox} from '../../../Elements';
import PostExclusiveContentsReview from './Review';
import {schema} from './schema';
import themedStyles from './styles';
import type {ContributionTier} from '../../../Projects/types';
import type {
  AccessibleTiersSelectProps,
  PostExclusiveContentsFormProps,
  FormData,
} from './types';

const AccessibleTiersSelect: FC<AccessibleTiersSelectProps> = ({
  tiers,
  onSelect,
  selection,
}) => {
  const styles = useTheme(themedStyles);
  return (
    <View>
      <Text style={[styles.optionsTitle]}>Which contributors can access?</Text>
      {tiers.map(item => (
        <CheckBox
          key={item.id}
          title={item?.attributes.name}
          onSelect={() => onSelect(item)}
          selected={selection.includes(item.id)}
        />
      ))}
    </View>
  );
};

const PostExclusiveContentsForm: FC<PostExclusiveContentsFormProps> = ({
  style,
  projectId,
}) => {
  const [data, setData] = useState<FormData>({
    title: '',
    description: '',
    accessible_tiers: [],
  });
  const {show} = useModal();
  const styles = useTheme(themedStyles);
  const {data: contributionTiers} = useGetData(ENDPOINTS.CONTRIBUTION_TIERS, {
    filters: {
      project: projectId,
    },
  });

  const maxHeight = Dimensions.get('window').height * 0.6;
  const onSubmit = async () => {
    Keyboard.dismiss();
    const previewData = {
      title: data.title,
      description: data.description,
      accessible_tiers: data.accessible_tiers.map((id: number) =>
        contributionTiers.data.find((item: ContributionTier) => item.id === id),
      ),
    };
    show({
      title: 'Looking good!',
      description: '',
      content: <PostExclusiveContentsReview data={previewData} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const onSelect = (item: ContributionTier) => {
    setData({
      ...data,
      accessible_tiers: data.accessible_tiers.includes(item.id)
        ? data.accessible_tiers.filter(val => val !== item.id)
        : [...data.accessible_tiers, item.id],
    });
  };

  // @ts-expect-error The validationForm param is simply more generic
  const validity = validateForm(schema, data);

  return (
    <View style={style}>
      <ScrollView style={{maxHeight}}>
        <Input
          placeholder="Title"
          onChange={onChange}
          value={data.title}
          name="title"
        />
        <Input
          placeholder="Description (Min 140 characters)"
          onChange={onChange}
          value={data.description}
          name="description"
          multiline
        />
        <AccessibleTiersSelect
          tiers={contributionTiers?.data ?? []}
          selection={data.accessible_tiers}
          onSelect={onSelect}
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View style={styles.actionBar}>
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

export default PostExclusiveContentsForm;

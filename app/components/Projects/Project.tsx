import React, {FC} from 'react';
import {Text, Image, View} from 'react-native';
import {Link} from '@react-navigation/native';
import {API_URL} from '@env';

import {useTheme} from '../../hooks/useTheme';
import themedStyles from './styles';
import type {ProjectProps} from './types';
import avatar from '../../assets/images/avatars/a0.jpg';
import {Routes} from '../../config/routes';

const Project: FC<ProjectProps> = ({item}) => {
  const styles = useTheme(themedStyles);
  const {
    attributes: {name, summary, project_type, images, users_permissions_user},
    id,
  } = item;
  const {
    data: {
      attributes: {email},
    },
  } = users_permissions_user;
  const {data} = images;
  const image = data?.length
    ? {uri: `${API_URL}${data[0].attributes.formats.thumbnail.url}`}
    : avatar;

  return (
    <View style={styles.container}>
      <Link
        to={{screen: Routes.ProjectDetails as never, params: {id} as never}}
        style={styles.link}>
        <View style={styles.row}>
          <Image source={image} style={styles.thumbnail} />
          <View style={styles.info}>
            <View style={styles.row}>
              <Text style={styles.projectType}>{`${project_type} by`}</Text>
              <Text style={styles.artist}>{email}</Text>
            </View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default Project;

import React, {FC} from 'react';

import {Span, H4, View, Link} from '../Polyfills';
import {ProjectStatus, type ProjectProps} from './types';
import Artist from '../Artist';
import Meta from './Meta';
import { Routes } from '@/app/config/routes';

const Project: FC<ProjectProps> = ({item}) => {
  const {id, name, summary, owner, reaction_count, type} = item;
  // const image = data?.length
  //   ? {uri: `${API_URL}${data[0].attributes.formats.thumbnail.url}`}
  //   : avatar;

  return (
    <View className="w-full bg-neutralPure p-4 rounded-xl mb-6">
      <Artist data={owner} />
      <Link to={{screen: `${Routes.Projects}/${id}`}}>
        <View>
          <H4 className="pt-4 pb-2">{name}</H4>
          <Span className="text-neutralMighty font-light">{summary}</Span>
          <Meta
            reactionCount={reaction_count}
            type={type}
            status={ProjectStatus.Live}
          />
        </View>
      </Link>
    </View>
  );
};

export default Project;
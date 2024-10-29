import React, {FC} from 'react';

import {Small, Span, View, Link} from '../Polyfills';
import {Icon} from '../Elements';
import {LinkToProjectProps} from './types';

const LinkToProject: FC<LinkToProjectProps> = ({name, id}) => (
  <Link
    className="w-full"
    to={{screen: 'ProjectDetails', params: {id}}}>
    <View className="w-full flex flex-row nowrap items-center bg-neutralDead rounded-md px-6 mb-4">
      <Small className="text-neutralMild font-light">From</Small>
      <Icon name="link" size={26} />
      <Span className="text-neutralStrong">{name}</Span>
    </View>
  </Link>
);

export default LinkToProject;
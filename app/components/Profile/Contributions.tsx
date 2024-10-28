'use client'

import React, {FC} from 'react';
import {View, Text, Image, Link} from '../Polyfills';

import {ENDPOINTS} from '../../config/endpoints';
import {Routes} from '../../config/routes';
import {useAccount} from '../../hooks/useAccount';
import {useGetData} from '../../hooks/useQuery';
import {getSmallestSize} from '../../utils/image';
import {fromBaseToken} from '../../utils/formatters';
import {ImageFormats} from '../Projects/types';
import SectionHeader from '../SectionHeader';
import type {ContributionProps, Contribution as ContributionType} from './types';

const Contribution: FC<ContributionProps> = ({data}) => {
  const projectId = data.attributes.project.data?.id ?? '';
  const formats = data.attributes.project.data?.attributes?.images?.data?.length
    ? data.attributes.project.data.attributes?.images.data[0].attributes.formats
    : ({} as ImageFormats);
  const image = getSmallestSize(formats);

  return (
    <Link
      to={{
        screen: `${Routes.Projects}/${projectId}`as never,
      }}>
      <View>
        <Image alt="" source={image} />
        <View>
          <View>
            <Text>
              {data.attributes.contribution_tier.data.attributes.name}
            </Text>
            <Text>
              {fromBaseToken(data.attributes.amount, 2, true)}
            </Text>
          </View>
          <Text>
            {data.attributes.project.data?.attributes.name ?? '-'}
          </Text>
        </View>
      </View>
    </Link>
  );
};

// @todo implement loading state
const Contributions: FC = () => {
  const {account} = useAccount();
  const {data} = useGetData(ENDPOINTS.CONTRIBUTIONS, {
    filters: {users_permissions_user: account?.id},
    include: {
      project: ['*'],
      contribution_tier: ['*'],
    },
  });

  const contributions: ContributionType[] = data?.data ?? [];

  return (
    <View>
      {contributions.length > 0 && (
        <SectionHeader title="Contributions" />
      )}
      {contributions.map(item => (
        <Contribution data={item} key={item.id} />
      ))}
    </View>
  );
};

export default Contributions;

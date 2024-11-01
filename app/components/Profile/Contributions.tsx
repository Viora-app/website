'use client'

import React, {FC} from 'react';

import {ENDPOINTS} from '../../config/endpoints';
import {Routes} from '../../config/routes';
import {useAccount} from '../../hooks/useAccount';
import {useGetData} from '../../hooks/useQuery';
import {getSmallestSize} from '../../utils/image';
import {fromBaseToken} from '../../utils/formatters';
import {View, H4, Span, Image, Link} from '../Polyfills';
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
      className="w-full"
      to={{
        screen: `${Routes.Projects}/${projectId}`as never,
      }}>
      <View className="flex flex-row no-wrap justify-between mb-4">
        <View className="flex flex-row nowrap items-center">
          <Image alt="Contribution" source={image} width={65} height={65} className="bg-secondaryMild rounded-xl overflow-hidden !p-0" />
          <H4 className="pl-2 text-primaryStrong">
            {data.attributes.project.data?.attributes.name ?? '-'}
          </H4>
        </View>
        <View className="text-right">
          <H4 className="text-primaryStrong">
            {data.attributes.contribution_tier.data.attributes.name}
          </H4>
          <Span className="text-primaryStrong font-light">
            {fromBaseToken(data.attributes.amount, 2, true)}
          </Span>
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
    <View className="w-full p-6">
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

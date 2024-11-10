import React, {FC} from 'react';

import {Routes} from '@/app/config/routes';
import {getSmallestSize} from '@/app/utils/image';
import {fromBaseToken} from '@/app/utils/formatters';
import {View, H4, Span, Image, Link} from '@/app/components/Polyfills';
import {ImageFormats} from '../Projects/types';
import SectionHeader from '../SectionHeader';
import type {ContributionProps, Contribution as ContributionType} from './types';
import {getUserContributions, getUserAccount} from '@/app/utils/api';

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
          <Image alt="Contribution" source={image.src} width={image?.width} height={image?.height} className="bg-secondaryMild rounded-xl overflow-hidden !p-0 w-[65px] h-[65px]" />
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
const Contributions: FC = async () => {
  const account = await getUserAccount();
  const contributions: ContributionType[] = await getUserContributions(account.id);

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

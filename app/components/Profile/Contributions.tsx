import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import {Link} from '@react-navigation/native';

import {ENDPOINTS} from '../../config/endpoints';
import {Routes} from '../../config/routes';
import {useTheme} from '../../hooks/useTheme';
import {useAccount} from '../../hooks/useAccount';
import {useGetData} from '../../hooks/useQuery';
import {getSmallestSize} from '../../utils/image';
import {fromBaseToken} from '../../utils/formatters';
import {ImageFormats} from '../Projects/types';
import SectionHeader from '../SectionHeader';
import themedStyles from './styles';
import type {ContributionProps, Contribution} from './types';

const Contribution: FC<ContributionProps> = ({data}) => {
  const styles = useTheme(themedStyles);
  const projectId = data.attributes.project.data?.id ?? '';
  const formats = data.attributes.project.data?.attributes?.images?.data?.length
    ? data.attributes.project.data.attributes?.images.data[0].attributes.formats
    : ({} as ImageFormats);
  const image = getSmallestSize(formats);

  return (
    <Link
      to={{
        screen: Routes.ProjectDetails as never,
        params: {id: projectId} as never,
      }}
      style={[styles.link, styles.spacerMini]}>
      <View style={[styles.wrapper]}>
        <Image source={image} style={styles.contributionsThumbnail} />
        <View
          style={[
            styles.column,
            styles.justifyBetween,
            styles.contributionsInfo,
          ]}>
          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={styles.semi}>
              {data.attributes.contribution_tier.data.attributes.name}
            </Text>
            <Text style={styles.semi}>
              {fromBaseToken(data.attributes.amount, 2, true)}
            </Text>
          </View>
          <Text style={[styles.base, styles.mild]}>
            {data.attributes.project.data?.attributes.name ?? '-'}
          </Text>
        </View>
      </View>
    </Link>
  );
};

// @todo implement loading state
const Contributions: FC = () => {
  const styles = useTheme(themedStyles);
  const {account} = useAccount();
  const {data} = useGetData(ENDPOINTS.CONTRIBUTIONS, {
    filters: {users_permissions_user: account?.id},
    include: {
      project: ['*'],
      contribution_tier: ['*'],
    },
  });

  const contributions: Contribution[] = data?.data ?? [];

  return (
    <View style={[styles.contributions, styles.column]}>
      {contributions.length > 0 && (
        <SectionHeader title="Contributions" style={styles.sectionHeader} />
      )}
      {contributions.map(item => (
        <Contribution data={item} key={item.id} />
      ))}
    </View>
  );
};

export default Contributions;

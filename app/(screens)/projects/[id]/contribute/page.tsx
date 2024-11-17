import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import Contribute from '@/app/components/Forms/Project/Contribute';
import {getProjectContributionTier} from '@/app/actions/getProjectContributionTiers';

const AddContributionTierScreen: FC<{params: Params<{id: number}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const options = await getProjectContributionTier(projectId);
  return (
    <SafeArea>
      <Contribute projectId={projectId} options={options} />
    </SafeArea>
  );
};

export default AddContributionTierScreen;

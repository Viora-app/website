import React, {FC} from 'react';

import {Image} from '@/app/components/Polyfills';
import {SafeArea} from '@/app/components/Elements';
import {apiBaseUrl} from '@/app/config/endpoints';

const PictureScreen: FC = async ({searchParams}) => {
  const awaitedSearchParams = await searchParams;
  const uri = `${apiBaseUrl}${awaitedSearchParams.url}`.replace('api/uploads', 'uploads');

  return (
    <SafeArea>
      <Image alt="Project photo" source={uri} />
    </SafeArea>
  );
};

export default PictureScreen;

import React, {FC} from 'react';
import {Image, Link} from '@/app/components/Polyfills';

import {Icon, SafeArea} from '@/app/components/Elements';
import { getApiUrl } from '@/app/utils/api';

const PictureScreen: FC = async ({searchParams}) => {
  const awaitedSearchParams = await searchParams;
  const apiUrl = getApiUrl();
  const uri = `${apiUrl}${awaitedSearchParams.url}`;

  return (
    <SafeArea>
      <Image alt="Project photo" source={uri} />
    </SafeArea>
  );
};

export default PictureScreen;

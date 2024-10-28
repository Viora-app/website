'use client'

import React, {FC, useEffect, useState} from 'react';
import {Image} from '../../../components/Polyfills';

import {SafeArea} from '../../../components/Elements';
import largePlaceholder from '../../../../public/images/gallerymain.png';

const PictureScreen: FC = ({params}) => {
  const [source, setSource] = useState(largePlaceholder);

  const getUri = async () => {
    const awaitedParams = await params;
    if (awaitedParams.uri) {
      setSource({uri: awaitedParams.uri});
    }
  };
  
  useEffect(() => {
    if (params) {
      getUri();
    }
  }, [params]);

  return (
    <SafeArea>
      <Image alt="" source={source} />
    </SafeArea>
  );
};

export default PictureScreen;

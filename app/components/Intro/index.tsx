import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config/routes';
import {usePresets} from '../../hooks/usePresets';
import Carousel from '../Carousel';
import Slide from './Slide';
import PersonalSelector from './PersonalSelector';
import {artistContents, fansContents, CURRENT_INTRO_VERSION} from './content';
import {Personas, SlideData} from './types';

const slideData: Record<Personas, SlideData[]> = {
  [Personas.Fan]: fansContents,
  [Personas.Artist]: artistContents,
};

const Intro = () => {
  const {presets, storePresets} = usePresets();
  const {navigate} = useNavigation();
  const [persona, setPersona] = useState<Personas | undefined>();

  useEffect(() => {
    if (presets.visitedIntroVersion >= CURRENT_INTRO_VERSION) {
      navigate(Routes.Login as never);
    }
  }, [navigate, presets.visitedIntroVersion]);

  const onEnd = () => {
    storePresets({visitedIntroVersion: CURRENT_INTRO_VERSION});
  };

  console.log('persona', persona, typeof persona);
  if (!persona) {
    return <PersonalSelector onSelect={setPersona} />;
  }

  console.log('data', persona, slideData[persona]);
  const data = slideData[persona];
  return <Carousel data={data} content={Slide} onEnd={onEnd} />;
};

export default Intro;

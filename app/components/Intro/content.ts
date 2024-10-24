import whyImage from '../../assets/images/why.png';
import howImage from '../../assets/images/how.png';
import whatImage from '../../assets/images/what.png';
import {colors} from '../../config/stylesGuides';
import type {SlideData} from './types';

export const CURRENT_INTRO_VERSION = '0.1.1';

export const artistContents: SlideData[] = [
  {
    image: whyImage,
    description: 'Take control of your music',
    backgroundColor: colors.light.primaryMild,
    color: colors.light.neutralZero,
  },
  {
    image: howImage,
    description: 'Crowdfund with ease',
    backgroundColor: colors.light.reassureMild,
    color: colors.light.primaryStrong,
  },
  {
    image: whatImage,
    description: 'Unlock exclusive fan experiences',
    backgroundColor: colors.light.warnMild,
    color: colors.light.neutralZero,
  },
];

export const fansContents: SlideData[] = [
  {
    image: whyImage,
    description: 'Get closer to your favorite artists',
    backgroundColor: colors.light.primaryMild,
    color: colors.light.neutralZero,
  },
  {
    image: howImage,
    description: 'Be part of the creative journey',
    backgroundColor: colors.light.reassureMild,
    color: colors.light.primaryStrong,
  },
  {
    image: whatImage,
    description: 'Become part of the journey',
    backgroundColor: colors.light.warnMild,
    color: colors.light.neutralZero,
  },
];

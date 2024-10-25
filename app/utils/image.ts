import {API_URL} from '@env';

import thumbnailPlaceholder from '../assets/images/gallerymini.png';
import largePlaceholder from '../assets/images/gallerymain.png';
import {ImageFormats, ImageSizes} from '../components/Projects/types';

const priorities = [
  ImageSizes.Thumbnail,
  ImageSizes.Small,
  ImageSizes.Medium,
  ImageSizes.Large,
];

export const getSmallestSize = (obj: ImageFormats) => {
  for (let size of priorities) {
    if (obj.hasOwnProperty(size)) {
      return {uri: `${API_URL}${obj[size].url}`};
    } else {
      return thumbnailPlaceholder;
    }
  }
};

export const getLargestSize = (obj: ImageFormats) => {
  const reversePriorities = priorities.reverse();

  for (let size of reversePriorities) {
    if (obj.hasOwnProperty(size)) {
      return {uri: `${API_URL}${obj[size].url}`};
    } else {
      return largePlaceholder;
    }
  }
};

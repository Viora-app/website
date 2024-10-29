import thumbnailPlaceholder from '../../public/images/gallerymini.png';
import largePlaceholder from '../../public/images/gallerymain.png';
import {ImageFormats, ImageSizes} from '../components/Projects/types';

const priorities = [
  ImageSizes.Thumbnail,
  ImageSizes.Small,
  ImageSizes.Medium,
  ImageSizes.Large,
];

export const getSmallestSize = (obj: ImageFormats) => {
  for (const size of priorities) {
    if (obj.hasOwnProperty(size)) {
      return `${process.env.NEXT_PUBLIC_API_URL}${obj[size].url}`;
    } else {
      return thumbnailPlaceholder;
    }
  }
};

export const getLargestSize = (obj: ImageFormats) => {
  const reversePriorities = priorities.reverse();

  for (const size of reversePriorities) {
    if (obj.hasOwnProperty(size)) {
      return `${process.env.NEXT_PUBLIC_API_URL}${obj[size].url}`;
    } else {
      return largePlaceholder;
    }
  }
};

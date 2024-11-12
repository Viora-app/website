import thumbnailPlaceholder from '@/public/images/gallerymini.png';
import largePlaceholder from '@/public/images/gallerymain.png';
import {ImageFormats, ImageSizes} from '@/app/config/types';

const priorities = [
  ImageSizes.Thumbnail,
  ImageSizes.Small,
  ImageSizes.Medium,
  ImageSizes.Large,
];

const baseURl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`

export const getSmallestSize = (obj: ImageFormats) => {
  for (const size of priorities) {
    if (obj.hasOwnProperty(size)) {
      return {
        src: `${baseURl}${obj[size].url}`,
        width: obj[size].width,
        height: obj[size].height,
      };
    } else {
      return {src: thumbnailPlaceholder};
    }
  }
};

export const getLargestSize = (obj: ImageFormats) => {
  const reversePriorities = priorities.reverse();

  for (const size of reversePriorities) {
    if (obj.hasOwnProperty(size)) {
      return {
        src: `${baseURl}${obj[size].url}`,
        width: obj[size].width,
        height: obj[size].height,
      };
    } else {
      return {src: largePlaceholder};
    }
  }
};

import {getSmallestSize, getLargestSize} from '../../utils/image';
import {ImageFormats} from '../Projects/types';

export const getPreferredSize = (
  obj: ImageFormats | undefined,
  index: number,
) => {
  if (index === 0) {
    return getLargestSize(obj ?? ({} as ImageFormats));
  }

  return getSmallestSize(obj ?? ({} as ImageFormats));
};

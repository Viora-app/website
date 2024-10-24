import {Themes} from '../../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    paddingBottom: boxes.paddingExtreme,
  },
  description: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h3,
    color: colors[theme].neutralStrong,
    paddingTop: boxes.paddingSmall,
  },
  punchline: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h2,
    color: colors[theme].primaryStrong,
  },
});

export default styles;

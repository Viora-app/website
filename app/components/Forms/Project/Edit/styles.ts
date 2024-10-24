import {Themes} from '../../../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  reviewWrapper: {
    paddingBottom: boxes.paddingMedium,
  },
  actionBar: {
    flexDirection: 'row',
    width: '100%',
    height: boxes.buttonHeight,
    marginTop: boxes.paddingSmall,
  },
  text: {
    color: colors[theme].neutralStrong,
    fontSize: fontSizes.h4,
    fontFamily: fontFamilies.poppinsRegular,
  },
  icon: {
    marginBottom: boxes.paddingMedium,
  },
});

export default styles;

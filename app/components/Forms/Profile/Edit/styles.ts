import {Themes} from '../../../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  input: {
    width: '100%',
    height: boxes.buttonHeight,
    borderRadius: boxes.radiusSmall,
    backgroundColor: colors[theme].neutralPale,
    color: colors[theme].neutralStrong,
    paddingLeft: boxes.paddingSmall,
    paddingRight: boxes.paddingSmall,
    marginBottom: boxes.paddingMedium,
  },
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

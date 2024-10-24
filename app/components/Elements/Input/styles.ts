import {Themes} from '../../../context/presetsContext/types';
import {boxes, colors, fontSizes} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    width: '100%',
  },
  title: {
    width: '100%',
    color: colors[theme].neutralStrong,
    paddingBottom: 5,
  },
  input: {
    width: '100%',
    height: boxes.buttonHeight,
    borderRadius: boxes.radiusSmall,
    backgroundColor: colors[theme].neutralPale,
    color: colors[theme].neutralStrong,
    paddingLeft: boxes.paddingSmall,
    paddingRight: boxes.paddingSmall,
    marginBottom: boxes.paddingMedium,
    lineHeight: fontSizes.h2,
  },
});

export default styles;

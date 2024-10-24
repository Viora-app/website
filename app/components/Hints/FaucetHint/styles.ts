import {Themes} from '../../../context/presetsContext/types';
import {boxes, colors, fontSizes} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: boxes.paddingExtreme,
  },
  image: {
    marginTop: -1 * boxes.paddingMedium,
    marginBottom: boxes.paddingMedium,
  },
  description: {
    fontSize: fontSizes.h3,
    color: colors[theme].neutralMild,
    paddingBottom: boxes.paddingMedium,
  },
  button: {},
});

export default styles;

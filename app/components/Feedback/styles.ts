import {Themes} from '../../context/presetsContext/types';
import {boxes, colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    borderWidth: 1,
    borderColor: 'transparent',
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
    marginTop: boxes.paddingMedium,
  },
  success: {
    color: colors[theme].reassureStrong,
  },
  error: {
    color: colors[theme].warnStrong,
  },
});

export default styles;

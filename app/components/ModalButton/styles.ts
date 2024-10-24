import {colors, boxes} from '../../config/stylesGuides';
import {Themes} from '../../context/presetsContext/types';

const styles = (theme: Themes) => ({
  button: {
    position: 'absolute',
    right: boxes.paddingMedium,
    backgroundColor: colors[theme].neutralZero,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  shadow: {
    shadowColor: colors[theme].primaryStrong,
    shadowOffset: {
      width: 0,
      height: (-1 * boxes.shadowHeight) / 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: boxes.shadowHeight,
  },
  spacer: {
    bottom: boxes.paddingMedium,
  },
  spacerDouble: {
    bottom: boxes.paddingExtreme,
  },
});

export default styles;

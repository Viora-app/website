import {Themes} from '../../../context/presetsContext/types';
import {
  fontSizes,
  colors,
  boxes,
  fontFamilies,
} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    width: '100%',
    height: boxes.buttonHeight,
    position: 'relative',
    borderWidth: boxes.borderWidth,
    borderColor: 'transparent',
  },
  touchable: {
    width: '100%',
    borderRadius: boxes.radiusSmall,
    overflow: 'hidden',
  },
  title: {
    width: '100%',
    lineHeight: boxes.buttonHeight - 2,
    textAlign: 'center',
    fontSize: fontSizes.h4,
    fontFamily: fontFamilies.poppinsRegular,
    marginBottom: 0,
  },
  primary: {
    color: colors[theme].neutralZero,
    backgroundColor: colors[theme].primaryStrong,
  },
  secondary: {
    color: colors[theme].primaryStrong,
    backgroundColor: colors[theme].neutralZero,
  },
  disabled: {
    color: colors[theme].neutralTender,
    backgroundColor: colors[theme].neutralZero,
    borderWidth: 0.5,
    borderColor: colors[theme].neutralTender,
  },
});

export default styles;

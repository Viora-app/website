import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
  fonts,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: boxes.paddingMedium,
  },
  image: {
    width: 68,
    height: 72,
  },
  title: {
    paddingTop: boxes.paddingMedium,
    color: colors[theme].neutralMighty,
    fontSize: fontSizes.h1,
    fontFamily: fontFamilies.poppinsBold,
  },
  version: {
    color: colors[theme].neutralMighty,
    fontSize: fontSizes.h3,
    fontFamily: fontFamilies.poppinsRegular,
  },
  passphrase: {
    color: colors[theme].neutralZero,
    ...fonts.passphrase,
  },
  hiddenPassphrase: {
    ...fonts.hiddenPassphrase,
  },
  iconButton: {
    position: 'absolute',
    bottom: -1 * boxes.paddingMedium,
    right: boxes.paddingMedium,
    backgroundColor: colors[theme].reassureStrong,
    padding: boxes.paddingSmall,
    borderRadius: boxes.radiusSmall,
  },
});

export default styles;

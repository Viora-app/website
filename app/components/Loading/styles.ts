import {
  colors,
  boxes,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';
import {Themes} from '../../context/presetsContext/types';

const styles = (theme: Themes) => ({
  wrapper: {
    flexFlow: 'row noWrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    height: '100%',
  },
  section: {
    height: 200,
  },
  title: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h4,
    color: colors[theme].primaryStrong,
  },
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  actionBar: {
    width: 200,
  },
});

export default styles;

import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  wrapper: {
    height: '100%',
  },
  container: {
    width: '100%',
    marginVertical: boxes.paddingMedium,
    paddingHorizontal: boxes.paddingMedium,
    boxSizing: 'border-box',
  },
  link: {
    flex: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  info: {
    paddingHorizontal: boxes.paddingSmall,
    flexShrink: 1,
  },
  title: {
    width: '100%',
    color: colors[theme].primaryStrong,
    fontSize: fontSizes.h4,
    fontFamily: fontFamilies.poppinsMedium,
    paddingVertical: boxes.paddingMedium / 4,
  },
  projectType: {
    color: colors[theme].neutralMild,
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.poppinsRegular,
  },
  artist: {
    color: colors[theme].neutralStrong,
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.poppinsRegular,
    paddingLeft: boxes.paddingMedium / 4,
  },
  summary: {
    color: colors[theme].neutralStrong,
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.poppinsRegular,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: boxes.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

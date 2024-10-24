import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  fullWidth: {
    width: '100%',
  },
  container: {
    paddingHorizontal: boxes.paddingSmall,
    height: '100%',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  spacerMini: {
    marginBottom: boxes.paddingMedium,
  },
  base: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.base,
    color: colors[theme].primaryStrong,
  },
  medium: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h4,
    color: colors[theme].primaryStrong,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  semi: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h3,
    color: colors[theme].primaryStrong,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  large: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h2,
    color: colors[theme].primaryStrong,
  },
  largest: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h1,
    color: colors[theme].primaryStrong,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    paddingBottom: 50,
    paddingHorizontal: boxes.paddingMedium,
    paddingVertical: boxes.paddingExtreme,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors[theme].seeThroughWhite,
    borderRadius: boxes.radiusExtreme,
    marginTop: boxes.paddingMedium,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  descriptionContainer: {
    width: '100%',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: colors[theme].primaryStrong,
    textAlign: 'center',
    paddingHorizontal: boxes.paddingMedium,
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h2,
  },
});

export default styles;

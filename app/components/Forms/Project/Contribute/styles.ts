import {Themes} from '../../../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../../../config/stylesGuides';

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
  spacerMini: {
    marginBottom: boxes.paddingSmall,
  },
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  tender: {
    color: colors[theme].neutralTender,
  },
  strong: {
    color: colors[theme].neutralStrong,
  },
  mild: {
    color: colors[theme].neutralMild,
  },
  reassureMild: {
    color: colors[theme].reassureMild,
  },
  reassureStrong: {
    color: colors[theme].reassureStrong,
  },
  zero: {
    color: colors[theme].neutralZero,
  },
  small: {
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.small,
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
  optionsWrapper: {
    width: '100%',
  },
  contributeOption: {
    backgroundColor: colors[theme].neutralPale,
    padding: boxes.paddingSemi,
    borderRadius: boxes.radiusSemi,
  },
  selectedOption: {
    backgroundColor: colors[theme].neutralStrong,
  },
  optionAmount: {
    paddingHorizontal: boxes.paddingSemi / 2,
    fontFamily: fontFamilies.poppinsRegular,
    fontSize: fontSizes.h3,
    lineHeight: 30,
    color: colors[theme].neutralZero,
    borderRadius: boxes.radiusMedium,
    overflow: 'hidden',
  },
  selectedAmount: {
    backgroundColor: colors[theme].reassureStrong,
  },
  normalAmount: {
    backgroundColor: colors[theme].neutralMild,
  },
});

export default styles;

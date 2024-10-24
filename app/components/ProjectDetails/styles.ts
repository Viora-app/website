import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontFamilies,
  fontSizes,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  container: {
    paddingHorizontal: boxes.paddingMedium,
  },
  header: {
    paddingBottom: boxes.paddingSemi,
  },
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
  deadlineWrapper: {
    backgroundColor: '#BBE1FF',
    padding: boxes.paddingMedium,
    borderRadius: boxes.radiusSmall,
  },
  deadlineIcon: {
    height: 50,
    width: 50,
    marginRight: boxes.paddingMedium,
  },
  artistWrapper: {
    backgroundColor: colors[theme].amberTender,
    padding: boxes.paddingMedium,
    borderRadius: boxes.radiusSmall,
  },
  artistInfo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  artistAvatarWrapper: {
    height: 60,
    width: 60,
    borderRadius: boxes.radiusSemi,
    marginRight: boxes.paddingMedium,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  artistAvatar: {
    height: 60,
    width: 'auto',
    backgroundColor: 'green',
  },
  artistName: {
    color: colors[theme].neutralZero,
    fontFamily: fontFamilies.poppinsMedium,
    letterSpacing: 0.5,
  },
  socialLinks: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: boxes.paddingLarger,
  },
  socialLink: {
    marginHorizontal: boxes.paddingSemi,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  progressWrapper: {
    backgroundColor: colors[theme].neutralMajestic,
    borderRadius: boxes.radiusSmall,
    padding: boxes.paddingLarge,
    flex: 1,
  },
  percentage: {
    fontFamily: fontFamilies.poppinsMedium,
    fontSize: 38,
    color: colors[theme].neutralZero,
  },
  goalsWrapper: {
    alignItems: 'flex-end',
    flex: 1,
  },
  barWrapper: {
    flex: 1,
    height: 40,
    backgroundColor: colors[theme].neutralZero,
    borderRadius: boxes.radiusSmall,
    marginTop: boxes.paddingSmall,
    position: 'relative',
  },
  hardCap: {
    height: 40,
    borderRadius: boxes.radiusSmall,
    backgroundColor: colors[theme].amberTender,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  softCap: {
    height: 40,
    borderRadius: boxes.radiusSmall,
    backgroundColor: colors[theme].reassureMild,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  stripe: {
    width: '100%',
    height: '100%',
    backgroundColor: colors[theme].neutralPale,
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

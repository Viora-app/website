import {Themes} from '../../context/presetsContext/types';
import {
  boxes,
  colors,
  fontSizes,
  fontFamilies,
} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors[theme].secondaryStrong,
    padding: boxes.paddingMedium,
  },
  logoContainer: {
    marginBottom: boxes.paddingMedium * 2,
  },
  logo: {
    width: 110,
    height: 100,
  },
  title: {
    fontSize: fontSizes.h1,
    fontFamily: fontFamilies.poppinsBlack,
    marginBottom: boxes.paddingMedium * 2,
    color: colors[theme].neutralMighty,
  },
  input: {
    width: '100%',
    height: 50, // You can define a height directly here
    padding: 0,
    paddingHorizontal: boxes.paddingSmall,
    backgroundColor: colors[theme].seeThroughWhite,
    color: colors[theme].neutralStrong,
    fontSize: fontSizes.h4,
    fontFamily: fontFamilies.poppinsRegular,
    letterSpacing: 0.3,
    marginBottom: boxes.paddingSmall,
    borderRadius: boxes.radiusSmall,
    borderWidth: boxes.borderWidth,
    borderColor: colors[theme].neutralTender,
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: colors[theme].warnStrong,
  },
  placeholderTextColor: colors[theme].neutralTender,
  errorContainer: {
    marginVertical: 4,
    paddingBottom: boxes.paddingSmall,
  },
  errorText: {
    color: colors[theme].warnStrong,
    fontSize: fontSizes.small,
  },
  signupText: {
    color: colors[theme].primaryStrong,
    marginTop: boxes.paddingMedium,
    textAlign: 'center',
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.poppinsRegular,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginVertical: boxes.paddingSmall,
  },
});

export default styles;

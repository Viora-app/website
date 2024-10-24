import {Themes} from '../../../context/presetsContext/types';
import {boxes, colors, fontFamilies} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  container: {
    paddingLeft: boxes.paddingMedium,
    paddingRight: boxes.paddingMedium,
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  rowNoWrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  title: {
    fontFamily: fontFamilies.poppinsMedium,
    color: colors[theme].neutralMighty,
  },
  state: {
    textAlign: 'right',
    paddingRight: boxes.paddingSmall,
    color: colors[theme].neutralMild,
  },
  iconWrapper: {
    backgroundColor: colors[theme].neutralZero,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: boxes.radiusSmall,
  },
  icon: {},
});

export default styles;

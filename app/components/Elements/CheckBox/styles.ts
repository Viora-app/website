import {Themes} from '../../../context/presetsContext/types';
import {boxes, colors, fontFamilies} from '../../../config/stylesGuides';

const styles = (theme: Themes) => ({
  container: {
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  rowNoWrap: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamilies.poppinsMedium,
    height: 40,
    lineHeight: 40,
    color: colors[theme].neutralMighty,
  },
  box: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: boxes.radiusSmall,
    borderColor: colors[theme].neutralTender,
    borderWidth: 8,
  },
  selected: {
    backgroundColor: colors[theme].reassureStrong,
    borderColor: colors[theme].reassureStrong,
  },
});

export default styles;

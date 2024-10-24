import {Themes} from '../../context/presetsContext/types';
import {boxes, colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  spacer: {
    marginBottom: boxes.paddingExtreme,
  },
  galleryWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: colors[theme].neutralZero,
    borderRadius: boxes.radiusLarge,
    padding: boxes.paddingSemi,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: boxes.paddingSemi / 2,
  },
  imageWrapper: {
    borderRadius: boxes.radiusMedium,
    overflow: 'hidden',
  },
  galleryMain: {
    width: '100%',
    height: 180,
  },
  galleryOther: {
    flex: 1,
    height: 80,
  },
  image: {
    width: 'auto',
    height: '100%',
  },
  addRemoveIcon: {
    position: 'absolute',
    backgroundColor: colors[theme].neutralZero,
    borderRadius: boxes.radiusSemi,
    left: boxes.paddingSmall / 2,
    top: boxes.paddingSmall / 2,
  },
});

export default styles;

import {Themes} from '../../context/presetsContext/types';
import {boxes, colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  modal: {
    margin: 0,
    position: 'relative',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
  },
  container: {
    width: '100%',
    paddingBottom: boxes.paddingMedium,
    paddingHorizontal: boxes.paddingMedium * 1.5,
    borderTopLeftRadius: boxes.radiusLarge,
    borderTopRightRadius: boxes.radiusLarge,
    backgroundColor: colors[theme].neutralZero,
    borderTopWidth: 1,
    borderTopColor: colors[theme].neutralZero,
  },
  header: {
    paddingHorizontal: 0,
  },
  shadow: {
    shadowColor: colors[theme].primaryStrong,
    shadowOffset: {
      width: 0,
      height: (-1 * boxes.shadowHeight) / 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: boxes.shadowHeight,
  },
  closeButton: {
    width: 35,
    height: 35,
    backgroundColor: colors[theme].secondaryMild,
    borderRadius: boxes.radiusSmall,
    marginTop: boxes.paddingSmall,
    position: 'absolute',
    top: boxes.paddingSmall,
    right: boxes.paddingMedium,
    zIndex: 10,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  actionBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default styles;

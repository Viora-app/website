import {Themes} from '../../context/presetsContext/types';
import {colors} from '../../config/stylesGuides';

const styles = (theme: Themes) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors[theme].secondaryStrong,
  },
  imageContainer: {
    height: 100,
    width: 312,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
});

export default styles;

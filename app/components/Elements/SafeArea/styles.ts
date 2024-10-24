import {colors} from '../../../config/stylesGuides';
import {Themes} from '../../../context/presetsContext/types';

const styles = (theme: Themes) => ({
  screenContainer: {
    height: '100%',
    width: '100%',
  },
  projectsScreen: {
    backgroundColor: colors[theme].secondaryStrong,
  },
});

export default styles;

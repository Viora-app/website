import {useContext} from 'react';
import PresetsContext from '../../context/presetsContext/PresetsContextProvider';
import {PresetsContextType} from '../../context/presetsContext/types';

export const usePresets = (): PresetsContextType => useContext(PresetsContext);

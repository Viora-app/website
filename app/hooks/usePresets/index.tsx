'use client'

import {useContext} from 'react';
import {PresetsContext} from '@/app/context/presetsContext/PresetsContextProvider';
import {PresetsContextType} from '@/app/context/presetsContext/types';

export const usePresets = (): PresetsContextType => useContext(PresetsContext);

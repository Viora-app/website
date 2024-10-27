'use client'

import React, {useState, useEffect, useCallback, createContext} from 'react';
import {USER_PRESETS} from '../../config/constants';
import {
  PresetsContextType,
  PresetsProviderProps,
  StoreResponse,
  StorePresetsProps,
  Themes,
  Presets,
} from './types';

const DEFAULT_PRESETS = {
  visitedIntroVersion: '0.0.0',
  visitedVoteHintVersion: '0.0.0',
  visitedFaucetVersion: '0.0.0',
  skipVoteConfirmation: false,
  theme: Themes.light,
};

export const PresetsContext = createContext<PresetsContextType>({
  presets: {} as Presets,
  storePresets: async () => ({success: false, message: ''}),
});

const PresetsProvider = ({children}: PresetsProviderProps) => {
  const [presets, setPresets] = useState<Presets>(DEFAULT_PRESETS);

  const storePresets = useCallback(
    async (params: StorePresetsProps): Promise<StoreResponse> => {
      try {
        const previousValues = await localStorage.getItem(USER_PRESETS);
        const previousValuesObject = previousValues
          ? JSON.parse(previousValues)
          : DEFAULT_PRESETS;

        const newValues = {
          ...previousValuesObject,
          ...params,
        };

        await localStorage.setItem(USER_PRESETS, JSON.stringify(newValues));
        setPresets(newValues);
        return {
          success: true,
          message: '',
        };
      } catch (error) {
        return {
          success: false,
          message: error?.message ?? 'An error occurred storing your session',
        };
      }
    },
    [setPresets],
  );

  const retrievePresets = useCallback(async (): Promise<void> => {
    let value = DEFAULT_PRESETS;
    try {
      const storedValue = await localStorage.getItem(USER_PRESETS);
      value = {
        ...DEFAULT_PRESETS,
        ...(storedValue ? JSON.parse(storedValue) : {}),
      };
    } catch (e) {
      console.log(e);
    }

    setPresets(value);
  }, [setPresets]);

  useEffect(() => {
    retrievePresets();
  }, [retrievePresets]);

  const value = {presets, storePresets};

  return (
    <PresetsContext.Provider value={value}>{children}</PresetsContext.Provider>
  );
};

export default PresetsProvider;

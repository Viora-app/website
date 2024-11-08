'use client';
import {FC} from 'react';
import {QueryClientProvider} from 'react-query';

import queryClient from '@/app/utils/queryClient';
import AccountProvider from './accountContext/AccountContextProvider';
import ModalProvider from './modalContext/ModalContextProvider';
import PresetsProvider from './presetsContext/PresetsContextProvider';
import {HocWithElementProps} from '../config/types';

const Providers: FC<HocWithElementProps> = ({children}) => (
  <PresetsProvider>
    <QueryClientProvider client={queryClient}>
      <AccountProvider>
        <ModalProvider>{children}</ModalProvider>
      </AccountProvider>
    </QueryClientProvider>
  </PresetsProvider>
);

export default Providers;

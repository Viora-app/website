'use client'
import {QueryClientProvider} from 'react-query';

import queryClient from '../utils/queryClient';
import AccountProvider from './accountContext/AccountContextProvider';
import ModalProvider from './modalContext/ModalContextProvider';
import PresetsProvider from './presetsContext/PresetsContextProvider';


const Providers = ({children}) => (
  <PresetsProvider>
    <QueryClientProvider client={queryClient}>
      <AccountProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AccountProvider>
    </QueryClientProvider>
  </PresetsProvider>
);

export default Providers;

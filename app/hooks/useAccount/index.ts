'use client'

import {useContext} from 'react';
import {AccountContext} from '@/app/context/accountContext/AccountContextProvider';
import {AccountContextType} from '@/app/context/accountContext/types';

export const useAccount = (): AccountContextType => useContext(AccountContext);

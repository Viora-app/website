'use client'

import {useContext} from 'react';
import {ModalContext} from '@/app/context/modalContext/ModalContextProvider';
import {ModalContextType} from '@/app/context/modalContext/types';

export const useModal = (): ModalContextType => useContext(ModalContext);

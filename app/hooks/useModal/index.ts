'use client'

import {useContext} from 'react';
import {ModalContext} from '../../context/modalContext/ModalContextProvider';
import {ModalContextType} from '../../context/modalContext/types';

export const useModal = (): ModalContextType => useContext(ModalContext);

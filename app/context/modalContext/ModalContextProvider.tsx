'use client'

import React, {useRef, useState, createContext} from 'react';
import {ModalProviderProps, ModalContent, ModalContextType} from './types';
import {Timeout} from '../../config/types';
import Modal from '../../components/Modal';

export const MODAL_ANIMATION_DURATION = 300;

export const ModalContext = createContext<ModalContextType>({
  show: () => {},
  hide: () => {},
  isVisible: false,
});

const ModalProvider = ({children}: ModalProviderProps) => {
  const timer = useRef<Timeout>();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ModalContent | null>(null);

  const show = (value: ModalContent) => {
    setContent(value);
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
    timer.current = setTimeout(() => {
      setContent(null);
    }, MODAL_ANIMATION_DURATION);
  };

  const value = {
    show,
    hide,
    isVisible,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal data={content} isVisible={isVisible} hide={hide} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;

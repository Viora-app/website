'use client'

import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';

import {IconButton} from '../Elements';
import {View, Image} from '../Polyfills';
import {Button} from '../Elements';
import {ModalProps} from './types';
import SectionHeader from '../SectionHeader';

const ModalHolder = ({data, hide, isVisible}: ModalProps) => {
  const [primaryPressed, setPrimaryPressed] = useState(false);
  const timeout = useRef();

  const positionOverlay = () => {
    setTimeout(() => {
      const overlay = document.querySelector('.ReactModal__Overlay');
      const parent = document.getElementById('app-main');

      if (overlay && parent) {
        Object.assign(overlay.style, {
          position: 'absolute',
          inset: 0,
          zIndex: 10000,
        });
      }
    }, 1);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  });

  useEffect(() => {
    positionOverlay();
  }, [isVisible]);

  useEffect(() => {
    if (primaryPressed) {
      setTimeout(() => {
        setPrimaryPressed(false);
      }, 100);
    }
  }, [data, primaryPressed, setPrimaryPressed]);

  return (
    <Modal
      parentSelector={() => document.getElementById('app-main')}
      className="w-full h-full absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 flex flex-row justify-center items-center z-1000"
      isOpen={isVisible}>
      <View className="w-full h-full bg-neutralPure rounded-xl p-6 border border-neutralPale box-border">
        <View className="w-full h-full relative">
          <SectionHeader
            title={data?.title as string}
            subtitle={data?.description}
          />
          <IconButton
            onPress={hide}
            iconSize={24}
            iconName="cross"
            iconColor="#A687AB"
            className="absolute right-0 top-0"
          />
          {data?.image && <Image alt="" source={data?.image} />}
          {data?.content}
          <View>
            {typeof data?.onSecondaryPress === 'function' && (
              <Button
                onPress={data.onSecondaryPress}
                title="Cancel"
              />
            )}
            {typeof data?.onPrimaryPress === 'function' && (
              <Button
                onPress={() => {
                  setPrimaryPressed(true);
                  if (data.onPrimaryPress) {
                    data.onPrimaryPress();
                  }
                }}
                title="Confirm"
                disabled={primaryPressed}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalHolder;

'use client'

import React, {useEffect, useState} from 'react';
import {View, Image} from '../Polyfills';
import Modal from 'react-modal';

import {IconButton} from '../Elements';
import {Button} from '../Elements';
import {ModalProps} from './types';
import SectionHeader from '../SectionHeader';

const ModalHolder = ({data, hide, isVisible}: ModalProps) => {
  const [primaryPressed, setPrimaryPressed] = useState(false);

  useEffect(() => {
    if (primaryPressed) {
      setTimeout(() => {
        setPrimaryPressed(false);
      }, 100);
    }
  }, [data, primaryPressed, setPrimaryPressed]);

  return (
    <Modal
      isOpen={isVisible}>
      <View>
        <View>
          <SectionHeader
            title={data?.title as string}
            subtitle={data?.description}
          />
          <IconButton
            onPress={hide}
            iconSize={24}
            iconName="cross"
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

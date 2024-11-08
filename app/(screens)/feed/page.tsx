'use client'

import React from 'react';

import {SafeArea} from '@/app/components/Elements';
import Feed from '@/app/components/Feed';
import Form from '@/app/components/Forms/Project/Create';
import ModalButton from '@/app/components/ModalButton';
import {ButtonType} from '@/app/components/ModalButton/types';

const FeedScreen = () => (
  <SafeArea>
    <Feed />
    <ModalButton
      type={ButtonType.Add}
      title="Let the world know"
      description="and receive love and support"
      modalContent={Form}
    />
  </SafeArea>
);

export default FeedScreen;
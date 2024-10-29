'use client'

import React from 'react';

import {SafeArea} from '../components/Elements';
import Feed from '../components/Feed';
import Form from '../components/Forms/Project/Create';
import ModalButton from '../components/ModalButton';
import {ButtonType} from '../components/ModalButton/types';

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
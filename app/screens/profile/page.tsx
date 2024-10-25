import React from 'react';
import {ScrollView} from 'react-native';

import Contributions from '../../components/Profile/Contributions';
import EditProfileForm from '../../components/Forms/Profile/Edit';
import {SafeArea} from '../../components/Elements';
import ModalButton from '../../components/ModalButton';
import {ButtonType} from '../../components/ModalButton/types';
import Basics from '../../components/Profile/Basics';

const ProfileScreen = () => (
  <SafeArea>
    <ScrollView>
      <Basics />
      <Contributions />
    </ScrollView>
    <ModalButton
      type={ButtonType.Edit}
      title="Edit profile"
      description="Let people find you easier"
      modalContent={EditProfileForm}
    />
  </SafeArea>
);

export default ProfileScreen;

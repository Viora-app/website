import React from 'react';
import {ScrollView} from '@/app/components/Polyfills';

import Contributions from '@/app/components/Profile/Contributions';
// import EditProfileForm from '@/app/components/Forms/Profile/Edit';
import {SafeArea} from '@/app/components/Elements';
// import ModalButton from '@/app/components/ModalButton';
// import {ButtonType} from '@/app/components/ModalButton/types';
import Basics from '@/app/components/Profile/Basics';

const ProfileScreen = () => (
  <SafeArea>
    <ScrollView>
      <Basics />
      <Contributions /> 
    </ScrollView>
    {/* <ModalButton
      type={ButtonType.Edit}
      title="Edit profile"
      description="Let people find you easier"
      modalContent={EditProfileForm}
    /> */}
  </SafeArea>
);

export default ProfileScreen;

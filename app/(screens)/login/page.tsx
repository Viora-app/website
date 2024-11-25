import React from 'react';

import {SafeArea} from '@/app/components/Elements';
import Login from '@/app/components/Login';

const LoginScreen = () => (
  <SafeArea className="!bg-neutralPure flex flex-col justify-center items-center">
    <Login />
  </SafeArea>
);

export default LoginScreen;

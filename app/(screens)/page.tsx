import React from 'react';
import {redirect} from 'next/navigation';
import { getServerSession } from 'next-auth';

import Login from '@/app/components/Login';
import { authConfig } from '@/lib/auth';
import { Routes } from '../config/routes';

const LoginScreen = async () => {
  const session = await getServerSession(authConfig);

  if (session?.user) {
    redirect(Routes.Feed);
  }

  return (
    <Login />
  );
};

export default LoginScreen;

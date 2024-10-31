'use client'

import React, {useEffect, useState, useCallback} from 'react';
import {useRouter} from 'next/navigation';

import {Routes} from '../../config/routes';
import {H3} from '../Polyfills';
import {SafeArea} from '../Elements';
import {useAccount} from '../../hooks/useAccount';

const Logout = () => {
  const {push: navigate} = useRouter();
  const {signOut, account} = useAccount();
  const [isNavigating, setIsNavigating] = useState(false);

  const logout = useCallback(async () => {
    if (!!account?.jwt && !isNavigating) {
      await signOut();
    }
    setIsNavigating(true);
    navigate(Routes.Login as never);
  }, [account?.jwt, isNavigating])

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <SafeArea className="!bg-neutralPure flex flex-col justify-center items-center">
      <H3>Logging you out</H3>
    </SafeArea>
  );
};

export default Logout;

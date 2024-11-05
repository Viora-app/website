'use client'

import React, {createContext, useEffect, useState, ReactNode} from 'react';
import Cookies from 'js-cookie';

import {USER_CREDENTIALS} from '@/app/config/constants';
import {ENDPOINTS} from '@/app/config/endpoints';
import {authenticate, register, getProfile, patchData} from '@/app/utils/api';
import {MapObjectConfig} from '@/app/utils/types';
import {mapObject} from '@/app/utils/convertors';
import type {
  Account,
  AccountContextType,
  ProfileResponse,
  ProfileMerged,
} from './types';

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined,
);

const AccountProvider = ({children}: {children: ReactNode}) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve stored credentials when the app starts
    const loadStoredAccount = async () => {
      try {
        const storedAccount = await localStorage.getItem(USER_CREDENTIALS);
        const jwt = Cookies.get('jwt');
        if (storedAccount) {
          setAccount({...JSON.parse(storedAccount), jwt});
       }
     } catch (e) {
        console.error('Failed to load stored credentials:', e);
     }
   };

    loadStoredAccount();
 }, []);

  const fetchAndMergeProfile = async (jwt: string) => {
    try {
      const response = await getProfile(jwt);
      const config = [
        'first_name',
        'last_name',
        'points',
        'avatar_url',
        'avatar',
        'address',
        {from: 'id', to: 'profileId'},
      ] as unknown as MapObjectConfig<ProfileResponse, ProfileMerged>;
      // @ts-expect-error The config is more generic
      const profile = mapObject(response, config);
      setAccount((prevAccount: Account | null) => ({
        ...((prevAccount as Account) ?? {}),
        ...(profile ?? {}),
     }));
      await localStorage.setItem(
        USER_CREDENTIALS,
        JSON.stringify({
          ...account,
          ...profile,
       }),
      );
   } catch (err) {
      console.log(err);
      setError('Failed to fetch profile');
   }
 };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await authenticate(email, password);
      const {jwt, user} = response;
      await localStorage.setItem(USER_CREDENTIALS, JSON.stringify(user));
      Cookies.set('jwt', jwt, {expires: 7});

      setAccount({jwt, ...user});
      await fetchAndMergeProfile(jwt);
   } catch (err: unknown) {
      const message = err.response
        ? err.response.data.error.message
        : err?.message;
      setError(message ?? 'Failed to sign in.');
   } finally {
      setLoading(false);
   }
 };

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await register(email, password, username);
      const {jwt, user} = response;
      await localStorage.setItem(USER_CREDENTIALS, JSON.stringify(user));
      Cookies.set('jwt', jwt, {expires: 7});

      setAccount({jwt, ...user});
      await fetchAndMergeProfile(jwt);
   } catch (err: unknown) {
      const message = err.response
        ? err.response.data.error.message
        : err?.message;
      setError(message ?? 'Failed to sign up.');
   } finally {
      setLoading(false);
   }
 };

  const signOut = async () => {
    setLoading(true);
    setError('');

    try {
      // Clear stored credentials
      await localStorage.removeItem(USER_CREDENTIALS);
      Cookies.remove('jwt');
      setAccount(null);
   } catch (err) {
      console.log(err);
      setError('Failed to sign out.');
   } finally {
      setLoading(false);
   }
 };

  const update = async (data: Partial<ProfileMerged>) => {
    setLoading(true);
    setError('');
    try {
      const response = await patchData(
        `${ENDPOINTS.PROFILES}/${account?.profileId}`,
        {data},
        account?.jwt,
      );
      return {success: !!response.data};
   } catch (err) {
      console.log(err);
      setError('Failed to update the profile.');
      return {success: false};
   } finally {
      setLoading(false);
      await fetchAndMergeProfile(account?.jwt ?? '');
   }
 };

  return (
    <AccountContext.Provider
      value={{account, signIn, signUp, signOut, update, error, loading}}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;

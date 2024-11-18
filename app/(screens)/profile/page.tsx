// Set dynamic rendering for this page
export const dynamic = 'force-dynamic';

import React from 'react';
import { ScrollView } from '@/app/components/Polyfills';
import Contributions from '@/app/components/Profile/Contributions';
import { SafeArea } from '@/app/components/Elements';
import Basics from '@/app/components/Profile/Basics';
import { getUserAccount } from '@/app/actions/getUserAccount';
import { getUserContributions } from '@/app/actions/getUserContributions';

const ProfilePage = async () => {
  const account = await getUserAccount();
  const contributions = await getUserContributions(account?.id);

  return (
    <SafeArea>
      <ScrollView>
        <Basics account={account} />
        <Contributions contributions={contributions} />
      </ScrollView>
    </SafeArea>
  );
};

export default ProfilePage;

'use client'

import React, {FC, useEffect} from 'react';
import {View} from '@/app/components/Polyfills';

import {ENDPOINTS} from '@/app/config/endpoints';
import {FetchStatus} from '@/app/config/types';
import {finalMessages} from '@/app/utils/modal';
import {useModal} from '@/app/hooks/useModal';
import {usePatchData} from '@/app/hooks/useQuery';
import {useAccount} from '@/app/hooks/useAccount';
import {
  EditProject,
  SupportProject,
  SuccessfulProjectOwner,
  FailingProjectOwner,
  SuccessfulProjectContributor,
  PublishedProjectOwner,
} from '../ProjectStatus';
import {ProjectStatus} from '../Projects/types';
import {ActionsProps} from './types';

const Actions: FC<ActionsProps> = ({owner, project, refresh}) => {
  const {show} = useModal();
  const mutation = usePatchData(ENDPOINTS.PROJECTS);
  const {account} = useAccount();

  const onProjectStatusChange = () => {
    let feedback = {
      status: FetchStatus.success,
      message: '',
    };
    if (mutation.error) {
      feedback = {
        status: FetchStatus.error,
        message: 'Oops! Something went wrong.',
      };
    }
    show(finalMessages(feedback));
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      mutation.reset();
      onProjectStatusChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError, mutation.isSuccess, mutation.isLoading]);

  const ownerId = Number(project?.attributes.users_permissions_user.data.id);
  const accountId = account?.id;
  const projectId = project?.id;
  const status = project?.attributes?.status;
  const deadline = project?.attributes.deadline;

  const editable = ownerId === accountId && status === ProjectStatus.Draft;

  const published =
    new Date(deadline) > new Date() &&
    (status === ProjectStatus.Published || status === ProjectStatus.Successful);

  const succeeded =
    new Date(deadline) <= new Date() &&
    (status === ProjectStatus.Successful || status === ProjectStatus.soldOut);

  const failing = status === ProjectStatus.Failing;

  return (
    <View>
      {editable && <EditProject projectId={projectId} refresh={refresh} />}

      {published && ownerId === accountId ? (
        <PublishedProjectOwner
          project={project}
          account={account!}
          artist={owner}
        />
      ) : null}

      {published && ownerId !== accountId ? (
        <SupportProject
          project={project}
          account={account!}
          artist={owner}
          refresh={refresh}
        />
      ) : null}

      {succeeded && ownerId === accountId ? (
        <SuccessfulProjectOwner projectId={projectId} />
      ) : null}

      {succeeded && ownerId !== accountId ? (
        <SuccessfulProjectContributor />
      ) : null}

      {failing && ownerId === accountId ? <FailingProjectOwner /> : null}
    </View>
  );
};

export default Actions;

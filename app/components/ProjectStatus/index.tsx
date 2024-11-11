import React, {FC} from 'react';

import {finalMessages} from '@/app/utils/modal';
import {shareProjectInvitation} from '@/app/utils/shareMenu';
import {ENDPOINTS} from '@/app/config/endpoints';
import {FetchStatus} from '@/app/config/types';
import {usePatchData} from '@/app/hooks/useQuery';
import EditProjectForm from '../Forms/Project/Edit';
import {useModal} from '@/app/hooks/useModal';
import {Image, View, H3, Span} from '@/app/components/Polyfills';
import CreateContributionTierForm from '../Forms/ContributionTier/Create';
import PostExclusiveContentsForm from '../Forms/ExclusiveContents/create';
import Contribute from '../Forms/Project/Contribute';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {ProjectStatus} from '../Projects/types';
import successImage from '@/public/images/success.png';
import errorImage from '@/public/images/error.png';
import {
  DefaultProjectStatusProps,
  FullDataComponentProps,
  PublishedProjectOwnerProps,
  SuccessfulProjectOwnerProps,
} from './type';

const EditProject: FC<DefaultProjectStatusProps> = ({projectId, refresh}) => {
  const mutation = usePatchData(ENDPOINTS.PROJECTS);
  const {show} = useModal();

  const AddContributionTier = () => {
    show({
      title: 'Add contribution tier',
      description: 'And enable fans to support you',
      content: <CreateContributionTierForm projectId={projectId} />,
    });
  };
  const edit = () => {
    show({
      title: 'Edit your project',
      description: 'Improvement is always a good thing',
      content: <EditProjectForm projectId={projectId} />,
    });
  };
  const publish = () => {
    show({
      title: 'Are you done editing?',
      description:
        'Once you go live, your fans will be able to contribute in your project. Please note that you will no longer be able to edit this project.',
      onPrimaryPress: async () => {
        try {
          const result = await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Published,
            },
          });
          const feedback = {
            status: FetchStatus.Error,
            message: 'Failed to upload your images.',
          };
          if (result.data) {
            feedback.status = FetchStatus.Success;
            feedback.message =
              'Wonderful! now your project is available for fans to support.';
          }

          show(finalMessages(feedback));
          refresh();
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };
  return (
    <View className="bg-primaryMild rounded-md p-4 mt-4">
      <H3 className="text-primaryMighty !font-normal pb-2">
        Now What?
      </H3>
      <Span className="text-neutralMighty">
        You Can edit your project if needed, and once ready, publish it.
      </Span>
      <View className="w-full pt-2">
        <Span className="text-neutralMighty !font-medium">
          You can add up to 5 contribution tiers.
        </Span>
      </View>
      <View className="flex flex-row justify-stretch gap-4 my-4">
        <Button
          title="Add contribution tier"
          theme={ButtonThemes.secondary}
          onPress={AddContributionTier}
        />
        <Button
          title="Edit"
          theme={ButtonThemes.secondary}
          onPress={edit}
        />
        <Button
          title="Go live"
          theme={ButtonThemes.primary}
          onPress={publish}
        />
      </View>
    </View>
  );
};

const SupportProject: FC<FullDataComponentProps> = ({
  account,
  project,
  artist,
  refresh,
}) => {
  const {show} = useModal();
  const support = () => {
    show({
      title: 'Support art & culture',
      description: 'You\'re about to make a difference',
      content: <Contribute projectId={project.id} refresh={refresh} />,
    });
  };

  return (
    <View className="bg-skyWeak p-4 rounded-md mt-6">
      <H3 className="text-primaryStrong !font-normal pb-2">
        Your time to shine
      </H3>
      <Span className="text-neutralSteady">
        You can now contribute in this project and become a part of it.
      </Span>
      <View className="w-full pt-2 pb-4">
        <Span className="text-neutralSteady !font-medium">
          Every small contribution matters.
        </Span>
      </View>
      <View className="flex flex-row justify-stretch gap-4">
        <Button
          title="Support"
          theme={ButtonThemes.secondary}
          onPress={support}
        />
        <Button
          title="Share"
          theme={ButtonThemes.secondary}
          onPress={() =>
            shareProjectInvitation(account, project, artist && artist.attributes)
          }
        />
      </View>
    </View>
  );
};

const PublishedProjectOwner: FC<PublishedProjectOwnerProps> = ({
  project,
  account,
  artist,
}) => {
  return (
    <View className="bg-skyWeak p-4 rounded-md mt-6">
      <H3 className="text-primaryStrong !font-normal pb-2">
        You can win this
      </H3>
      <Span className="text-neutralSteady">
        Your project is now published.
      </Span>
      <View className="w-full pt-2 pb-4">
        <Span className="text-neutralSteady !font-medium">
            Reach out to your fans in your socials and ask them to support you.
        </Span>
      </View>
      <Button
        title="Share"
        theme={ButtonThemes.secondary}
        onPress={() =>
          shareProjectInvitation(account, project, artist && artist.attributes)
        }
      />
    </View>
  );
};

const SuccessfulProjectOwner: FC<SuccessfulProjectOwnerProps> = ({
  projectId,
}) => {
  const mutation = usePatchData(ENDPOINTS.PROJECTS);
  const {show} = useModal();
  const withdraw = () => {
    show({
      title: 'Congratulation!',
      description:
        'We are happy that you have succeed in raising funds. Everybody is looking forward to hear more about your music. Use the funds to make the dream come true!',
      onPrimaryPress: async () => {
        try {
          await mutation.mutate({
            id: projectId,
            data: {
              status: ProjectStatus.Withdrawn,
            },
          });
        } catch (e) {
          console.error('Error updating project status:', e);
        }
      },
    });
  };
  const postExclusiveContent = () => {
    show({
      title: 'Post Exclusive content',
      description: 'Improvement is always a good thing',
      content: <PostExclusiveContentsForm projectId={projectId} />,
    });
  };

  return (
    <View className="bg-skyWeak p-4 rounded-md mt-6">
      <H3 className="text-primaryStrong !font-normal pb-2">Successful</H3>
      <Span className="text-neutralSteady">
        Your project has successfully raised funds. Now is the time to shine!
      </Span>
      <View className="w-full pt-2 pb-4">
        <Span className="text-neutralSteady">
          Once ready, you can post updates to deliver your promise.
        </Span>
      </View>
      <Image alt="Successful" source={successImage} className="w-[80px] pb-4" />
      <View className="flex flex-row justify-stretch gap-4">
        <Button
          title="Post exclusive content"
          theme={ButtonThemes.secondary}
          onPress={postExclusiveContent}
        />
        <Button
          title="Withdraw"
          theme={ButtonThemes.secondary}
          onPress={withdraw}
        />
      </View>
    </View>
  );
};

const SuccessfulProjectContributor: FC = () => (
  <View className="bg-skyWeak p-4 rounded-md mt-6">
    <H3 className="text-primaryStrong !font-normal pb-2">Successful</H3>
    <Span className="text-neutralSteady">
      This project has successfully raised funds. Once ready, The artist will
      publish updates to deliver your rewards.
    </Span>
    <Image alt="Successful" source={successImage} className="w-[80px] py-4" />
  </View>
);

const FailingProjectOwner: FC = () => (
  <View className="bg-amberWeak p-4 rounded-md mt-6">
    <H3 className="text-primaryStrong !font-normal pb-2">We are Sorry</H3>
    <Span className="text-neutralSteady">
      This project did not raise the required funds.
    </Span>
    <Image alt="Failed" source={errorImage} className="w-[60px] py-4" />
  </View>
);

export {
  EditProject,
  SupportProject,
  PublishedProjectOwner,
  SuccessfulProjectOwner,
  SuccessfulProjectContributor,
  FailingProjectOwner,
};

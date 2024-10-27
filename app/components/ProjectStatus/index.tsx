import {Image, Text, View} from '../Polyfills';
import React, {FC} from 'react';

import {finalMessages} from '../../utils/modal';
import {shareProjectInvitation} from '../../utils/shareMenu';
import {ENDPOINTS} from '../../config/endpoints';
import {FetchStatus} from '../../config/types';
import {usePatchData} from '../../hooks/useQuery';
import EditProjectForm from '../Forms/Project/Edit';
import {useModal} from '../../hooks/useModal';
import CreateContributionTierForm from '../Forms/ContributionTier/Create';
import PostExclusiveContentsForm from '../Forms/ExclusiveContents/create';
import Contribute from '../Forms/Project/Contribute';
import {Button} from '../Elements';
import {ButtonThemes} from '../Elements/Button/types';
import {ProjectStatus} from '../Projects/types';
import successImage from '../../../public/images/success.png';
import errorImage from '../../../public/images/error.png';
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
      content: <CreateContributionTierForm id={projectId} />,
    });
  };
  const edit = () => {
    show({
      title: 'Edit your project',
      description: 'Improvement is always a good thing',
      content: <EditProjectForm id={projectId} />,
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
            status: FetchStatus.error,
            message: 'Failed to upload your images.',
          };
          if (result.data) {
            feedback.status = FetchStatus.success;
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
    <View>
      <Text>
        Now What
      </Text>
      <Text>
        You Can edit your project if needed, and once ready,publish it.
      </Text>
      <Text>
        You can add up to 5 contribution tiers.
      </Text>
      <Button
        title="Add contribution tier"
        theme={ButtonThemes.secondary}
        onPress={AddContributionTier}
      />
      <Button
        title="Go live"
        theme={ButtonThemes.secondary}
        onPress={publish}
      />

      <Button
        title="Edit"
        theme={ButtonThemes.primary}
        onPress={edit}
      />
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
    <View>
      <Text>
        Your time to shine
      </Text>
      <Text>
        You can now contribute in this project and become a part of it.
      </Text>
      <Text>
        Every small contribution matters.
      </Text>
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
  );
};

const PublishedProjectOwner: FC<PublishedProjectOwnerProps> = ({
  project,
  account,
  artist,
}) => {
  return (
    <View>
      <Text>
        You can win this
      </Text>
      <Text>
        Your project is published.
      </Text>
      <Text>
        Reach out to your fans in your socials and ask them to support you.
      </Text>
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
    <View>
      <Text>Successful</Text>
      <Text>
        Your project has successfully raised funds. Now is the time to shine!
      </Text>
      <Text>
        Once ready, you can post updates to deliver your promise.
      </Text>
      <Image alt="" source={successImage} />
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
  );
};

const SuccessfulProjectContributor: FC = () => {
  return (
    <View>
      <Text>
        Successful
      </Text>
      <Text>
        This project has successfully raised funds. Once ready, The artist will
        publish updates to deliver your rewards.
      </Text>
      <Image alt="" source={successImage} />
    </View>
  );
};

const FailingProjectOwner: FC = () => {
  return (
    <View>
      <Text>We are Sorry</Text>
      <Text>
        This project did not raise the required funds.
      </Text>
      <Image alt="" source={errorImage} />
    </View>
  );
};

export {
  EditProject,
  SupportProject,
  PublishedProjectOwner,
  SuccessfulProjectOwner,
  SuccessfulProjectContributor,
  FailingProjectOwner,
};

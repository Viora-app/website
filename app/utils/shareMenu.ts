import {Share, Alert} from 'react-native';
import {Project} from '../components/Projects/types';
import {ArtistShareProp} from '../components/ProjectDetails/types';

export const shareProjectInvitation = async (
  user: any,
  project: Project,
  artist: ArtistShareProp['attributes'],
) => {
  // Fetch user's name and family, fallback to email if not available
  const userName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email;

  const artistName =
    artist?.first_name && artist?.last_name
      ? `${artist.first_name} ${artist.last_name}`
      : `${artist?.email}`;

  // Format message
  const message = `
    ${userName} has invited you to view and support a new music project on Viora\n\n
    ${project.attributes.name} by ${artistName}\n\n
    Join the project: viora://project/${project.id}\n\n
    New to Viora? Visit https://viora.app/install
  `;

  try {
    await Share.share({
      message: message.trim(), // Ensure proper formatting
    });
  } catch (err) {
    Alert.alert('Error', err.message);
  }
};

import {Project} from '@/app/components/Projects/types';
import { AccountAttrs } from '../config/types';
import { toast } from 'react-toastify';

export const shareProjectInvitation = async (
  user: AccountAttrs,
  project: Project,
  artist: AccountAttrs,
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

  if (typeof navigator?.share === 'function') {
    await navigator.share({
      text: message.trim(),
    });
  } else {
    navigator.clipboard.writeText(message.trim() ?? '');
    toast('Message copied to clipboard');
  }
};

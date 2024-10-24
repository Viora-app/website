import {ImageFormats} from '../../components/Projects/types';

export interface Profile {
  first_name: string;
  last_name: string;
  avatar_url: string;
  avatar: {
    formats: ImageFormats;
  } | null;
  points: number;
  address: string;
}

export type ProfileResponse = Profile & {
  id: number;
};

export type WalletResponse = {
  id: number;
  attributes: {
    address: string;
  };
};

export type ProfileMerged = Profile & {
  profileId: number;
};

export interface Account extends ProfileMerged {
  email: string | undefined;
  username: string;
  jwt: string;
  id: number;
  blocked: boolean;
  confirmed: boolean;
}

export type AccountContextType = {
  account: Account | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  update: (params: Partial<ProfileMerged>) => Promise<{success: boolean}>;
  error: string;
  loading: boolean;
};

export type authenticateError = {
  response: {
    data: {
      message: string;
    };
  };
};

export type StorageError = {
  message: string;
};

import {ImageData} from '../Projects/types';

export interface Contribution {
  id: string;
  attributes: {
    amount: number;
    project: {
      data: {
        id: string;
        attributes: {
          name: string;
          images: {
            data: ImageData[];
          };
        };
      };
    };
    contribution_tier: {
      data: {
        id: string;
        attributes: {
          name: string;
        };
      };
    };
  };
}

export interface ContributionProps {
  data: Contribution;
}

export interface AvatarProps {
  style?: object;
}

export interface FileEvent {
  uri: string;
  name: string;
  type: string;
}

export interface WalletProps {
  style?: object;
}

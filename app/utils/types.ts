import {FetchStatus} from '../config/types';

export type EndpointParams = Partial<
  Record<
    | 'offset'
    | 'limit'
    | 'sort'
    | 'audioID'
    | 'transactionID'
    | 'blockID'
    | 'creatorAddress'
    | 'awardedTo'
    | 'address'
    | 'winner',
    string | number
  >
>;

export interface MetaProps {
  total: number;
  offset: number;
  count: number;
}

export interface EndpointResult<T> {
  data: T;
  meta: MetaProps;
}

export type AwaitedEndpointResult<T> = Promise<EndpointResult<T>>;

export interface ErrorResponse {
  message: string;
  error: true;
}

export interface IncomingHttpHeaders {
  'accept-patch'?: string;
  'accept-ranges'?: string;
  'www-authenticate'?: string;
  Authorization?: string;
  accept?: string;
  warning?: string;
  [header: string]: string | string[] | undefined;
}

export type StrapiResponse = {
  id: number;
  attributes: {
    [key: string]: any;
  };
};

export type FlattenedResponse = {
  id: number;
  [key: string]: any;
};

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export type MapObjectConfig<Input, Output> =
  | keyof Input
  | {from: keyof Input; to: keyof Output};

type ValidatorFunction = (value: any) => boolean;
export type ValidatorSchema = {
  [key: string]: ValidatorFunction | RegExp;
};

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface RouteParams {
  route: {
    params: Record<string, unknown> | undefined;
  };
  navigation: {
    goBack: () => void;
    navigate: (
      params: string | {name: string; params?: Record<string, unknown>},
    ) => {};
  };
}

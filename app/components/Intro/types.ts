export enum Personas {
  Artist = 'artist',
  Fan = 'fan',
}

export interface SlideData {
  backgroundColor: string;
  image: unknown;
  description: string;
  color: string;
}

export interface IntroContentProps {
  data: SlideData;
}

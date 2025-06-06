import { StoreItem } from './Store';
import { CreationRequest } from './CreationRequest';

export const ALL_PROFESSIONS = [
  'Painters & Illustrators',
  'Ceramic artists',
  'Fiber artists',
  'Jewelery makers',
  'Leatherworkers',
  'Soap & Candle artists',
  'Woodworkers',
  'Mixed media',
  'Doll & Miniature artists',
  'Other'
];

export class Artist {
  id?: number;
  login?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined | number;
  bio?: string | undefined;
  portfolioItems?: PortfolioItem[] = [];
  storeItems?: StoreItem[] = [];
  requests?: CreationRequest[] = [];
  professions?: string[] = [];


}

export class PortfolioItem {
  id?: number | undefined;
  title: string | undefined;
  description: string | undefined;
  photoUrl: string = '';
}


import { StoreItem } from './Store';

export class Artist {
  login: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  storeItems: StoreItem[] = [];
  professions: string[] = [];
}
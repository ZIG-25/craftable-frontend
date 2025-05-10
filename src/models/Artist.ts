import { StoreItem } from './Store';

export class Artist {
  login: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  bio: string | undefined;
  portfolioItems: PortfolioItem[] = [];
  storeItems: StoreItem[] = [];
  professions: string[] = [];
}

export class PortfolioItem {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  images: string[] = [];
}

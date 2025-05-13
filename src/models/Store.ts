import { Artist } from './Artist';

export class StoreItem {
  id: number | undefined;
  price: number | undefined;
  title: string | undefined;
  description: string | undefined;
  images: string[] = [];
  artist: Artist | undefined;


}
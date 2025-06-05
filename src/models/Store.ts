import { Artist } from './Artist';

export class StoreItem {
  id?: number | undefined;
  price: number | undefined;
  title: string | undefined;
  description: string | undefined;
  itemPictureIds: ItemPicture[] = [];
  creatorId: Artist | undefined;
  itemOrderId?: number | null;

}

export class ItemPicture {
  id?: number;
  photoUrl?: string;
}
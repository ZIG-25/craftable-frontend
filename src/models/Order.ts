import { StoreItem } from './Store';

export class Order {
  id?: number;
  deliveryAddress?: string;
  date?: Date;
  status?: string;

  customerId?: any;
  itemForSaleId?: StoreItem
}
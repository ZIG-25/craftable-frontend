import { CreatorRegistrationData, CustomerRegistrationData } from './AuthModels';
import { Artist } from './Artist';

export class CreationRequest {
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  customerId?: CustomerRegistrationData | undefined;
  creatorId: Artist | undefined;
  deadline?: Date;
  status: 'awaiting acceptation' | 'pending' | 'marked as done' | 'cancelled' | 'done' | undefined;
}
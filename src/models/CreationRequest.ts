import { CreatorRegistrationData, CustomerRegistrationData } from './AuthModels';

export class CreationRequest {
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  customer: CustomerRegistrationData | undefined;
  creator: CreatorRegistrationData | undefined;
  status: 'awaiting acceptation' | 'pending' | 'marked as done' | 'cancelled' | 'done' | undefined;
}
import { CreationRequest } from './CreationRequest';

export class Customer {
  id?: number;
  password?: string;
  login?: string;
  email?: string;
  bio?: string;
  name?: string;
  surname?: string;
  requests: CreationRequest[] = []

}


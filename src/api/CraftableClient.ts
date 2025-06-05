import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  CreatorRegistrationData,
  CustomerRegistrationData,
  LoginData,
} from '../models/AuthModels';
import {
  ClientResponse,
  LoginResponse,
  LoginResult,
} from '../models/ApiResponse';
import { loginDestination, Role } from '../models/Role';
import { JwtHandler } from './JwtHandler';
import { Artist } from '../models/Artist';
import { StoreItem } from '../models/Store';
import { Order } from '../models/Order';
import { CreationRequest } from '../models/CreationRequest';

export class CraftableClient {
  private client: AxiosInstance;
  private readonly tokenHandler: JwtHandler;

  constructor() {
    this.tokenHandler = new JwtHandler();
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  public async login(data: LoginData): Promise<LoginResult> {
    let response: AxiosResponse<LoginResponse>;
    try {
      response = await this.client.post('/auth/login', data);
    } catch (err) {
      return {
        success: false,
        data: null,
        destination: '.',
      };
    }
    this.tokenHandler.storeToken(response.data.token);
    const role: Role = this.tokenHandler.getRole();

    return {
      success: true,
      data: response.data.token,
      destination: loginDestination(role),
    };
  }

  public async registerCustomer(
    data: CustomerRegistrationData,
  ): Promise<ClientResponse<string>> {
    let response: AxiosResponse<string>;
    try {
      response = await this.client.post('/user/create', data);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: error.response?.data.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async registerCreator(
    data: CreatorRegistrationData,
  ): Promise<ClientResponse<string>> {
    let response: AxiosResponse<string>;
    try {
      response = await this.client.post('/seller/create', data);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: error.response?.data.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async getAllArtists(): Promise<ClientResponse<Artist[]>> {
    let response: AxiosResponse<Artist[]>;
    try {
      response = await this.client.get('/creator/all');
      console.log(response);
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async getArtist(id: number): Promise<ClientResponse<Artist | null>> {
    let response: AxiosResponse<Artist>;
    try {
      response = await this.client.get(`/creator`, {
        params: { id: id },
      });
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async getArtistSigned(): Promise<ClientResponse<Artist | null>> {
    let response: AxiosResponse<Artist | any>;
    try {
      console.log(this.tokenHandler.getToken());
      response = await this.client.get(`/creator/self`, {
        headers: { Authorization: `Bearer ${this.tokenHandler.getToken()}` },
      });
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async createNewStoreItem(
    item: StoreItem,
  ): Promise<ClientResponse<string>> {
    let response: AxiosResponse<string>;
    console.log(item);
    try {
      response = await this.client.post(`/itemsforsale`, item);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: error.response?.data.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async getAllOffers(): Promise<ClientResponse<StoreItem[]>> {
    let response: AxiosResponse<StoreItem[]>;
    try {
      console.log(this.tokenHandler.getToken());
      response = await this.client.get(`/itemsforsale`, {
        headers: { Authorization: `Bearer ${this.tokenHandler.getToken()}` },
      });
    } catch (err) {
      console.log(err);

      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async createOrder(
    order: Order,
  ): Promise<ClientResponse<Order | null>> {
    let response: AxiosResponse<Order | null>;
    try {
      response = await this.client.post(`/orders`, order, {
        headers: {
          Authorization: `Bearer ${this.tokenHandler.getToken()}`
        }
      });
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async getAllOrders() : Promise<ClientResponse<Order[]>> {
    let response: AxiosResponse<Order[]>;
    try {
      response = await this.client.get(`/orders/by-artist`, {
        headers: {
          Authorization: `Bearer ${this.tokenHandler.getToken()}`
        }
      });
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }

  public async createRequest(request: CreationRequest) : Promise<ClientResponse<CreationRequest | null>> {
    let response: AxiosResponse<CreationRequest | null>;
    try {
      response = await this.client.post(`/request-new-creation`, request, {
        headers: {
          Authorization: `Bearer ${this.tokenHandler.getToken()}`
        }
      });
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: error.response?.status || 500,
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    };
  }
}

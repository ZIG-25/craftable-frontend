import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { CreatorRegistrationData, CustomerRegistrationData, LoginData } from '../models/AuthModels';
import { ClientResponse, LoginResponse, LoginResult } from '../models/ApiResponse';
import { loginDestination, Role } from '../models/Role';
import { JwtHandler } from './JwtHandler';

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

  public async registerCustomer(data: CustomerRegistrationData): Promise<ClientResponse<string>> {
    let response: AxiosResponse<string>;
    try {
      response = await this.client.post('/user/create', data);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: error.response?.data.message || 'Unknown error',
        statusCode: error.response?.status || 500
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    }
  }

  public async registerCreator(data: CreatorRegistrationData): Promise<ClientResponse<string>> {
    let response: AxiosResponse<string>;
    try {
      response = await this.client.post('/seller/create', data);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<Error>;
      return {
        success: false,
        data: error.response?.data.message || 'Unknown error',
        statusCode: error.response?.status || 500
      };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
    }
  }


}

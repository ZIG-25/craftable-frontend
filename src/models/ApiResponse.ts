export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export type LoginResult = {
  success: boolean;
  data: string | null;
  destination: string;
}

export type LoginResponse = {
  token: string;
}


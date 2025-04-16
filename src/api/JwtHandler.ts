import { Role } from '../models/Role';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../models/Token';

export class JwtHandler {
  private readonly TOKEN_KEY = "token";

  private token: string | undefined;

  constructor(token: string | undefined = undefined) {
    this.token = token;
  }

  public getRole(): Role {
    if (!this.token) {
      throw new Error('No Token provided');
    }

    const claims: TokenPayload = jwtDecode(this.token);
    switch (claims.userDetail) {
      case 'ROLE_CUSTOMER':
        return Role.CUSTOMER;
      case 'ROLE_CREATOR':
        return Role.CREATOR;
      case 'ROLE_ADMIN':
        return Role.ADMIN;
      default:
        throw new Error(`Unknown claim: ${claims.userDetail}`);
    }
  }

  public storeToken(token: string) {
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, this.token);
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_KEY) ?? undefined;
    }

    // If there is still not token, raise error
    if (!this.token) {
      throw new Error(`No Token provided`);
    }

    return this.token;
  }


  public removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

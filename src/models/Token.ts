import { JwtPayload } from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
  userDetail?: string;
}
import { ApiResponse } from '../api/api.dto';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  auth: boolean;
  accessToken: string;
  expiresIn: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
}

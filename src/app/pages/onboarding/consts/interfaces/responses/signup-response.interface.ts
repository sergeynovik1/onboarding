import { Tokens } from '../tokens.interface';

export interface SignupResponse {
  next: string;
  tokens: Tokens;
  userId: string;
}

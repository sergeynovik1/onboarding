import { Tokens } from '../tokens.interface';

export interface UpdateAddressedResponse {
  next: string;
  tokens: Tokens;
  userId: string;
}

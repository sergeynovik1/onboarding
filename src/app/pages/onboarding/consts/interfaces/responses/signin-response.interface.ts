import { Tokens } from '../tokens.interface';
import { User } from '../user.interface';

export interface SignInResponse {
  tokens: Tokens;
  user: User;
}

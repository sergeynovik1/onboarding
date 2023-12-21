import { Tokens } from '../tokens.interface';

export interface UploadDocumentResponse {
  next: string;
  tokens: Tokens;
  userId: string;
}

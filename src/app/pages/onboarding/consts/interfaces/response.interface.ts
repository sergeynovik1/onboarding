export interface Response<T> {
  api_success: boolean;
  data: T;
  error: any;
  message: string;
  status_code: number;
}

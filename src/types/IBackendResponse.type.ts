export interface IBackendResponse<TData = null> {
  success: boolean;
  data: TData;
  timestamp: string;
  error: string;
  pagination: null;
}

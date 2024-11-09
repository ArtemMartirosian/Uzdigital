export interface IFeedbackApisPayload {
  kindergartenId?: number;
  images?: string[] | string;
  phone: string;
  subject: string;
  message: string;
}

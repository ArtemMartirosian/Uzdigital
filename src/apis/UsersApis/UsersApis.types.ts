export interface IUserPatchPayload {
  phone?: string;
  language: string;
}

export interface IUser {
  id: number;
  name: string;
  phone: null;
  language: string;
  telegram_chat_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}

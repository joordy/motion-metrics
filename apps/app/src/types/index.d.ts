export type FormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    admin: boolean;
    email: string;
    email_verified: boolean;
    first_name: string;
    last_name: string;
    phone_verified: boolean;
    sub: string;
    subscribed: boolean;
  };
  identities: Array<unknown>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

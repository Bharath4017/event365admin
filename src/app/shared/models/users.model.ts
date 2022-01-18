export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  mobile_number: string;
  profile_image?: any;
  token: string;
  verification: string;
  user_type: string;
  user_status: string;
  ip?: any;
  is_email_verified: boolean;
  created_by: number;
  updated_by?: any;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date;
}

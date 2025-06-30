export interface DecodedUser {
  user_id: number;
  email: string;
  role: 'buyer' | 'seller' | 'admin' | 'superadmin';
  exp: number;
  iat: number;
}
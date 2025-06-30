'use server';
import { cookies } from 'next/headers';
import jwtDecode from 'jwt-decode';
import { DecodedUser } from '@/lib/type';


export const getCurrentUser = async (): Promise<DecodedUser | null> => {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) return null;
  try {
    const decoded = jwtDecode<DecodedUser>(accessToken);
    return decoded;
  } catch (error) {
    console.error('JWT Decode error:', error);
    return null;
  }
};
import { FieldValues } from 'react-hook-form';
import { cookies } from 'next/headers';

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.access && result.refresh) {
      const cookieStore = cookies();
      cookieStore.set('accessToken', result.access, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      cookieStore.set('refreshToken', result.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

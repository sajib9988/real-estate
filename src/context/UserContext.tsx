"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { getCurrentUser } from '@/service/auth';
import { TUser } from '@/lib/type';


interface IUserProv {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProv | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null); // Ensure user is null on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUser();
  }, []); // Empty dependency array

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }
  return context;
};

export default UserProvider;

import { createContext } from "react";

export interface IUser {
  username: string;
  email: string;
  googleId: string | null;
  profilePicURL: string;
  id: string;
}

export const UserContext = createContext<{ user: IUser; setUser }>(null);

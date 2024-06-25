import { UserDTO } from "@dtos/userDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import { storageUserSave, storageUserGet } from "../storage/storageUser";

import { api } from "@services/api";

export type AuthContenxtDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContenxtDataProps>(
  {} as AuthContenxtDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged) {
      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

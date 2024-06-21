import { UserDTO } from "@dtos/userDTO";
import { createContext, ReactNode, useState } from "react";

export type AuthContenxtDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContenxtDataProps>(
  {} as AuthContenxtDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({
    id: "1",
    name: "Rodrigo",
    email: "rodrigo@gmail.com",
    avatar: "rodrigo.png",
  });
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

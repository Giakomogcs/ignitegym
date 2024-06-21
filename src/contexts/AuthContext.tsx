import { UserDTO } from "@dtos/userDTO";
import { createContext } from "react";

export type AuthContenxtDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContenxtDataProps>(
  {} as AuthContenxtDataProps
);

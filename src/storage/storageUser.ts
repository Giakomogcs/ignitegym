import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/userDTO";

import { USER_STORAGE } from "./storageConfig";
import { parse } from "react-native-svg";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
}
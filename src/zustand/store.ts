import { UserProps, useUserStoreProps } from "./interfaces";
import { create } from "zustand";

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: {
    _id: "",
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "offline",
  },
  setUser: (newUser: UserProps | null) => {
    set(() => ({
      user: newUser || {
        _id: "",
        uuid: "",
        first_name: "",
        last_name: "",
        username: "",
        status: "offline",
      },
    }));
  },
  token: "",
  setToken: (newToken) => {
    set(() => ({ token: newToken }));
  },
}));

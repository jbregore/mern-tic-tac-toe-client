import { UserProps, useUserStoreProps } from "./interfaces";
import { create } from "zustand";

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: {
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "offline",
  },
  setUser: (newUser: UserProps | null) => {
    set(() => ({
      user: newUser || {
        uuid: "",
        first_name: "",
        last_name: "",
        username: "",
        status: "offline",
      },
    }));
  },
}));

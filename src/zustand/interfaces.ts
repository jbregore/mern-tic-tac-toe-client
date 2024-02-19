export interface useUserStoreProps {
  user: UserProps;
  setUser: (newUser: UserProps | null) => void;
  token: string;
  setToken: (newToken: string) => void;
}

export interface UserProps {
  _id: string;
  uuid: string;
  first_name: string;
  last_name: string;
  username: string;
  status: "online" | "offline";
}

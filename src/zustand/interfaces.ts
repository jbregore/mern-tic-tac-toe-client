export interface useUserStoreProps {
  user: UserProps;
  setUser: (newUser: UserProps | null) => void;
}

export interface UserProps {
  uuid: string;
  first_name: string;
  last_name: string;
  username: string;
  status: "online" | "offline";
}

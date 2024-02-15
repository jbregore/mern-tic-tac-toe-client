export interface NavbarProps {
  activeLink: "play" | "rankings" | "history" | "profile";
}

export interface NavbarLinkProps {
  title: string;
  link: string;
  isActive?: boolean;
}

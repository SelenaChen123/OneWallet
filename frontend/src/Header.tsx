import { LoginButton } from "./LoginButton";
import LogoutButton from "./LogoutButton";

interface Props {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: Props) {
  if (isAuthenticated) {
    return <>
      <LogoutButton />
    </>
  }

  return <LoginButton />
}
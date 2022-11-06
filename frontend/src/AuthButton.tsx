import { useAuth0 } from "@auth0/auth0-react";
import "./styles/AuthButton.css"

interface Props {
  isLogin: boolean;
}

export function AuthButton({ isLogin }: Props) {
  const { loginWithRedirect, logout } = useAuth0();

  if (isLogin) {
    return <button className="auth-button" onClick={() => loginWithRedirect()}>Log In</button>;
  }

  return (
    <button className="auth-button" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

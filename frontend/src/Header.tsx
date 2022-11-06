import { AuthButton } from "./AuthButton";
import "./styles/Header.css"

interface Props {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: Props) {
  return (
    <header>
      <h1>OneWallet</h1>
      <AuthButton isLogin={!isAuthenticated} />
    </header>
  );
}
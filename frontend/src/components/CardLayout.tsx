import "../styles/CardLayout.css";

interface Props {
  width: string | number;
  children: React.ReactNode;
  darkMode: boolean;
}

export default function CardLayout({ width, children, darkMode }: Props) {
  return (
    <main className="card" style={{ width }} data-dark={darkMode}>
      {children}
    </main>
  );
}
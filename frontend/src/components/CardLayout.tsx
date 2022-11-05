import "../styles/CardLayout.css";

interface Props {
  children: React.ReactNode;
}

export default function CardLayout({ children }: Props) {
  return (
    <main className="card">
      {children}
    </main>
  );
}
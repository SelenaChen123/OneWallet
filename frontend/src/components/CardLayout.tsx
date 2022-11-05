import "../styles/CardLayout.css";

interface Props {
  width: string | number;
  children: React.ReactNode;
}

export default function CardLayout({ width, children }: Props) {
  return (
    <main className="card" style={{ width }}>
      {children}
    </main>
  );
}
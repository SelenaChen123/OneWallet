import '../styles/CreditScore.css';

interface Props {
    creditScore: number;
    children: React.ReactNode;
}

export default function CreditScoreMarker({ creditScore, children }: Props) {
    const marginLeft = ((creditScore - 350) * 0.1965 - 1.5) + "%";

    return (
        <div style={{ marginTop: "-10%" }}>
            <p style={{ marginLeft: marginLeft }}>{creditScore}</p>
            <img src={require('../public/Marker.png')} className="marker" style={{ marginLeft: marginLeft }} />
            {children}
        </div>
    );
}

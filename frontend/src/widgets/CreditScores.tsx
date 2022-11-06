import CardLayout from "../components/CardLayout";
import CreditScoreMarker from "../components/CreditScoreMarker";
import { CreditScoreData } from "../types";
import '../styles/CreditScore.css';

interface Props {
    creditScores: CreditScoreData[];
}

function CreditScores({ creditScores }: Props) {
    return (
        <CardLayout width="25vw">
            <div className="heading">
                {/* <IconContext.Provider value={{ className: "icon" }}><MdOutlineReceiptLong /></IconContext.Provider> */}
                <h2>Credit Scores</h2>
            </div>
            <div className="padding">
                <hr />
            </div>
            <div className="content">
                {creditScores !== null && creditScores.map(creditScore => (
                    <div>
                        <div className="row col">
                            <div className="subsubheading" >
                                <p>{creditScore.reportingAgency}</p>
                            </div>
                            <div>
                                <p>Last Reported: </p>
                                <p>{creditScore.reportDate.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div>
                            <CreditScoreMarker creditScore={creditScore.creditScore} >
                                <img className="bar" src={require('../public/CreditScoreBar.png')} />
                            </CreditScoreMarker>
                        </div>
                    </div>
                ))}
            </div>
        </CardLayout>
    )
}

export default CreditScores;

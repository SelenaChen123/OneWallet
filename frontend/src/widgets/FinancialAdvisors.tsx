import CardLayout from "../components/CardLayout"
import { FinancialAdvisorData } from '../types';
import { IconContext } from "react-icons";
import { IoPersonOutline } from "react-icons/io5";
import { BsFillFilePersonFill } from "react-icons/bs";
import CloseWidget from "../components/CloseWidget";

interface Props {
    financialAdvisors: FinancialAdvisorData[];
    darkMode: boolean;
    editMode: boolean;
    closeSection: () => void;
}

function FinancialAdvisors({ financialAdvisors, darkMode, editMode, closeSection }: Props) {

    return (
        <div>
            <CardLayout width="40vw" darkMode={darkMode}>
                <div className="heading">
                    <IconContext.Provider value={{ className: "icon" }}><IoPersonOutline /></IconContext.Provider>
                    <h2>Financial Advisors</h2>

                    {editMode && <CloseWidget closeSection={closeSection} />}
                </div>
                <div className="padding">
                    <hr />
                </div>
                <div className="content">
                    {financialAdvisors.map(advisors => (
                        <div>
                            <div className="subheading">
                                <p>{advisors.bankName}</p>
                            </div>
                            <div className="grid">
                                <div className="profile">
                                    <IconContext.Provider value={{ className: "profile" }}><BsFillFilePersonFill /></IconContext.Provider>
                                </div>
                                <div>
                                    <p>{advisors.advisor.name}</p>
                                    <p>{advisors.advisor.phone}</p>
                                    <p>{advisors.advisor.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardLayout >
        </div>
    )
}

export default FinancialAdvisors;

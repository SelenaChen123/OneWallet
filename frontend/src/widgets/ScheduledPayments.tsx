import CardLayout from "../components/CardLayout";
import CloseWidget from "../components/CloseWidget";
import { ScheduledPaymentData } from "../types";

interface Props {
    scheduledPayments: ScheduledPaymentData[];
    darkMode: boolean;
    editMode: boolean;
    closeSection: () => void;
}

function ScheduledPayments({ scheduledPayments, darkMode, editMode, closeSection }: Props) {
    return (
        <CardLayout width="40vw" darkMode={darkMode}>
            <div className="heading">
                {/* <IconContext.Provider value={{ className: "icon" }}><MdOutlineReceiptLong /></IconContext.Provider> */}
                <h2>Scheduled Payments</h2>

                {editMode && <CloseWidget closeSection={closeSection} />}
            </div>
            <div className="padding">
                <hr />
            </div>
            <div className="content">
                {scheduledPayments.map(bill => (
                    <div className="row">
                        <div className="subsubheading">
                            <p>{bill.dueDate.toLocaleDateString()}</p>
                        </div>
                        <div style={{ flexGrow: '99' }}>
                            {bill.bills.map(bill => (
                                <div className="col">
                                    <div>
                                        <p>{bill.description}</p>
                                    </div>
                                    <div>
                                        <p>${bill.amountDue}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </CardLayout>
    )
}

export default ScheduledPayments;

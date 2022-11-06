import CardLayout from "../components/CardLayout"
import { BillData } from "../types";
import { IconContext } from "react-icons";
import { MdOutlineReceiptLong } from "react-icons/md";

interface Props {
    billsTimeline: BillData[];
}

function Bills({ billsTimeline }: Props) {
    return (
        <CardLayout width="25vw">
            <div className="heading">
                <IconContext.Provider value={{ className: "icon" }}><MdOutlineReceiptLong /></IconContext.Provider>
                <h2>Bills</h2>
            </div>
            <div className="padding">
                <hr />
            </div>
            <div className="content">
                {billsTimeline !== null && billsTimeline.map(scheduledBills => (
                    <div className="row">
                        <div className="subsubheading">
                            <p>{scheduledBills.dueDate.toLocaleDateString()}</p>
                        </div>
                        <div style={{ flexGrow: '99' }}>
                            {scheduledBills.bills !== null && scheduledBills.bills.map(bill => (
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

export default Bills;

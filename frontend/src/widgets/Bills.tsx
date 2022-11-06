import CardLayout from "../components/CardLayout"
import { BillData } from "../types";
import { IconContext } from "react-icons";
import { MdOutlineReceiptLong } from "react-icons/md";

interface Props {
    billsTimeline: BillData[];
}

function Bills({ billsTimeline }: Props) {
    // billsTimeline = [
    //     {
    //         dueDate: new Date("2022-12-01T17:00:00"),
    //         bills: [
    //             { description: "Rent", paid: "200.00" }
    //         ]
    //     },
    //     {
    //         dueDate: new Date("2023-01-01T17:00:00"),
    //         bills: [
    //             { description: "Groceries", paid: "80.00" },
    //             { description: "Netflix Subscription", paid: "10.00" },
    //             { description: "Dinner", paid: "20.00" },
    //         ]
    //     }
    // ]

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
                                        <p>${bill.isPaid}</p>
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

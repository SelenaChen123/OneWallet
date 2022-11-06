import { useState } from "react";
import CardLayout from "../components/CardLayout"

interface Bill {
    description: string
    paid: string
}

interface ScheduledBills {
    dueDate: Date
    bills: Bill[] | null
}

interface Props {
    billsTimeline: ScheduledBills[] | null
}

function Bills({ billsTimeline }: Props) {
    const [data, setData] = useState(billsTimeline)

    billsTimeline = [
        {
            dueDate: new Date("2022-11-05T17:00:00"),
            bills: [
                { description: "Rent", paid: "200.00" }
            ]
        },
        {
            dueDate: new Date("2023-01-01T17:00:00"),
            bills: [
                { description: "Groceries", paid: "80.00" },
                { description: "Netflix Subscription", paid: "10.00" },
                { description: "Dinner", paid: "20.00" },
            ]
        }
    ]

    return (
        <CardLayout width="25vw">
            <div className="heading">
                <h2>Bills</h2>
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
                                        <p>${bill.paid}</p>
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

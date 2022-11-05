import { useState } from "react";
import '../styles/Bills.css';
import CardLayout from "../components/CardLayout"

interface Bill {
    description: string
    paid: number
}

interface Date {
    day: string
    month: string
    year: number
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
            dueDate: { day: "6th", month: "November", year: 2022 },
            bills: [
                { description: "Rent", paid: 200 }
            ]
        },
        {
            dueDate: { day: "9th", month: "November", year: 2022 },
            bills: [
                { description: "Grocery", paid: 80 },
                { description: "Only Fans Subscription", paid: 600 }
            ]
        }
    ]

    return (
        <CardLayout width={500}>
            <div className="heading">
                <h2>Bills</h2>
            </div>
            {billsTimeline !== null && billsTimeline.map(scheduledBills => (
                <div>
                    <h3>{scheduledBills.dueDate.month} {scheduledBills.dueDate.day}, {scheduledBills.dueDate.year}</h3>
                    {scheduledBills.bills !== null && scheduledBills.bills.map(bill => (
                        <div>
                            <a>{bill.description}</a> 
                            <a>${bill.paid}</a>
                            
                        </div>
                    ))}
                </div>
            ))}
        </CardLayout>
    )
}

export default Bills;

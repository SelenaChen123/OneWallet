import "../styles/Bills.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { preprocessData } from "../App";
import CardLayout from "../components/CardLayout"
import { BillData } from "../types";
import { IconContext } from "react-icons";
import { MdOutlineReceiptLong } from "react-icons/md";
import CloseWidget from "../components/CloseWidget";
import { showMoney } from "../utils";

interface Props {
    billsTimeline: BillData[];
    darkMode: boolean;
    editMode: boolean;
    closeSection: () => void;
}

function Bills({ billsTimeline, darkMode, editMode, closeSection }: Props) {
    const [data, setData] = useState(billsTimeline);
    const { getAccessTokenSilently } = useAuth0();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [addDroppeddown, setAddDroppeddown] = useState(false)

    async function checkBill(description: string) {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://hacknc2022ast-api`,
                scope: "read:bankinfo",
            });

            await fetch("http://localhost:5000/api/check-bill", {
                method: "POST",
                body: JSON.stringify({ description }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const newData = [...data];
            const billGroup = newData.find(x => x.bills.some(y => y.description === description))!;
            const bill = billGroup.bills.find(x => x.description === description)!;
            bill.isPaid = !bill.isPaid;
            setData(newData);
        } catch (e) {
            console.log((e as any).message);
        }
    }

    async function removeBill(description: string) {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://hacknc2022ast-api`,
                scope: "read:bankinfo",
            });

            await fetch("http://localhost:5000/api/remove-bill", {
                method: "POST",
                body: JSON.stringify({ description }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const newData = [...data];
            const billGroup = newData.find(x => x.bills.some(y => y.description === description))!;
            const keptBills = billGroup.bills.filter(x => x.description !== description)!;
            billGroup.bills = keptBills
            setData(newData);
        } catch (e) {
            console.log((e as any).message);
        }
    }

    async function addBill(description: string, amountDue: number, dueDate: string) {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://hacknc2022ast-api`,
                scope: "read:bankinfo",
            });

            await fetch("http://localhost:5000/api/add-bill", {
                method: "POST",
                body: JSON.stringify({ description, amountDue, dueDate }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const response = await fetch(`http://localhost:5000/api/info`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const newData = await response.json();
            setData(preprocessData(newData).billData);
            setAddDroppeddown(false)
        } catch (e) {
            console.log((e as any).message);
        }
    }

    return (
        <div id="bills">
            <CardLayout width="40vw" darkMode={darkMode}>
                <div className="heading">
                    <IconContext.Provider value={{ className: "icon" }}><MdOutlineReceiptLong /></IconContext.Provider>
                    <h2>Bills</h2>

                    {editMode && <CloseWidget closeSection={closeSection} />}
                </div>
                <div className="padding">
                    <hr />
                </div>
                <div className="content">
                    {data.map(scheduledBills => (
                        <div className="row">
                            <div className="subsubheading">
                                <p>{scheduledBills.dueDate.toLocaleDateString()}</p>
                            </div>
                            <div style={{ flexGrow: '99' }}>
                                {scheduledBills.bills.map(bill => (
                                    <div className="col" style={{ color: bill.isPaid ? "gray" : "inherit" }}>
                                        <div>
                                            <input type={'checkbox'} checked={bill.isPaid} onChange={() => checkBill(bill.description)} />
                                            <span style={{ textDecoration: bill.isPaid ? "line-through" : "none", marginLeft: "1em" }}>{bill.description}</span>
                                        </div>
                                        <div>
                                            <span style={{ textDecoration: bill.isPaid ? "line-through" : "none", marginRight: "2em" }}>{showMoney(bill.amountDue)}</span>
                                            <span className="remove-bill" onClick={() => removeBill(bill.description)}>
                                                ✖
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {
                    addDroppeddown ? (
                        <div className="create-new-bill">
                            <div className="create-bill-field">
                                <label>Description</label>
                                <input type={"text"} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="create-bill-field">
                                <label>Amount</label>
                                <input type={'number'} value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
                            </div>
                            <div className="create-bill-field">
                                <label>Due Date</label>
                                <input type={'text'} value={dueDate} onChange={e => setDueDate(e.target.value)} />
                            </div>
                            <button className="confirm-add-bill" onClick={() => addBill(description, amount, dueDate)}>Create</button>
                            <button className="cancel-add-bill" onClick={() => setAddDroppeddown(false)}>Cancel</button>
                        </div>
                    ) :
                        <button className="confirm-add-bill" onClick={() => setAddDroppeddown(true)}>Add new bill</button>
                }
            </CardLayout >
        </div>
    )
}

export default Bills;

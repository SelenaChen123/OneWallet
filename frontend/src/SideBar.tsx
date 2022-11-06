import { AuthButton } from "./AuthButton";
import "./styles/SideBar.css"
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet, MdOutlineReceiptLong } from "react-icons/md";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai"

interface SectionIconProps {
  icon: any;
  enabled: boolean;
}

function SectionIcon({ icon, enabled }: SectionIconProps) {
  return (
    <div style={{ marginTop: "1em"}}>
      <span className={"sidebar-section-icon " + (enabled ? "enabled-section-icon" : "disabled-section-icon")}>
        {icon}
      </span>
    </div>
  )
}

interface Props {
  isAuthenticated: boolean;
  darkMode: boolean;
  setDarkMode: (which: boolean) => void;
  activeSections: string[];
  setActiveSections: (sections: string[]) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

function SideBar({ isAuthenticated, darkMode, setDarkMode, activeSections, setActiveSections, editMode, setEditMode }: Props) {
  return (
    <>
      <div className="bar-transparent" data-dark={darkMode}></div>
      <div className="bar" data-dark={darkMode}>
        <div>
          <h1>OneWallet</h1>
        </div>
        <div style={{ marginBottom: "1em" }}>
          <AuthButton isLogin={!isAuthenticated} />
        </div>
        <div className="darkmode-switch-container">
          <BsSunFill />
          <span style={{ justifyContent: darkMode ? "flex-end" : "flex-start" }} onClick={() => setDarkMode(!darkMode)} className="darkmode-switch">
            <div className="darkmode-switch-circle">⬤</div>
          </span>
          <BsFillMoonFill />
        </div>

        <div>
          <SectionIcon icon={<MdOutlineAccountBalanceWallet />} enabled={activeSections.includes("Balances")} />
          <SectionIcon icon={<HiOutlineArrowsRightLeft />} enabled={activeSections.includes("Transactions")} />
          <SectionIcon icon={<MdOutlineReceiptLong />} enabled={activeSections.includes("Bills")} />
          <SectionIcon icon={<MdOutlineAccountBalanceWallet />} enabled={activeSections.includes("Scheduled Payments")} />
          <SectionIcon icon={<MdOutlineAccountBalanceWallet />} enabled={activeSections.includes("Credit Scores")} />
          <SectionIcon icon={<MdOutlineAccountBalanceWallet />} enabled={activeSections.includes("Financial Advisors")} />
        </div>

        <div onClick={() => setEditMode(!editMode)} className="edit-switch">
          {editMode ? "Finish Edits" : "Edit"} <AiFillEdit />
        </div>
      </div>
    </>
  )
}

export default SideBar;
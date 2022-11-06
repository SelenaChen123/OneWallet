import { AuthButton } from "./AuthButton";
import "./styles/SideBar.css"
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet, MdOutlineReceiptLong } from "react-icons/md";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { AiFillEdit, AiOutlineClockCircle } from "react-icons/ai"
import { Section } from "./App";
import { BiTachometer } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";

interface SectionIconProps {
  icon: any;
  enabled: boolean;
  editMode: boolean;
  addSection: () => void;
  name: Section;
}

function SectionIcon({ icon, enabled, editMode, addSection, name }: SectionIconProps) {
  return (
    <div onClick={() => {
      if (enabled) {
        const el = document.getElementById(name.toLowerCase().replace(" ", "-"))
        el?.scrollIntoView({ behavior: "smooth" })
      } else {
        addSection()
      }
      }} style={{ marginTop: "1em" }}>
      <span className={"sidebar-section-icon " + (enabled ? "enabled-section-icon" : "disabled-section-icon")} style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {icon} {!enabled && editMode && "+"}
        </div>
      </span>
    </div>
  )
}

interface Props {
  isAuthenticated: boolean;
  darkMode: boolean;
  setDarkMode: (which: boolean) => void;
  activeSections: Record<Section, boolean>;
  setActiveSections: (sections: Record<Section, boolean>) => void;
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
          <SectionIcon name="Balances" icon={<MdOutlineAccountBalanceWallet />} enabled={activeSections["Balances"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Balances": true })} />
          <SectionIcon name="Transactions" icon={<HiOutlineArrowsRightLeft />} enabled={activeSections["Transactions"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Transactions": true })} />
          <SectionIcon name="Scheduled Payments" icon={<AiOutlineClockCircle />} enabled={activeSections["Scheduled Payments"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Scheduled Payments": true })} />
          <SectionIcon name="Bills" icon={<MdOutlineReceiptLong />} enabled={activeSections["Bills"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Bills": true })} />
          <SectionIcon name="Credit Scores" icon={<BiTachometer />} enabled={activeSections["Credit Scores"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Credit Scores": true })} />
          <SectionIcon name="Financial Advisors" icon={<IoPersonOutline />} enabled={activeSections["Financial Advisors"]} editMode={editMode} addSection={() => setActiveSections({ ...activeSections, "Financial Advisors": true })} />
        </div>

        <div onClick={() => setEditMode(!editMode)} className="edit-switch">
          {editMode ? "Finish Edits" : "Edit"} <AiFillEdit />
        </div>
      </div>
    </>
  )
}

export default SideBar;
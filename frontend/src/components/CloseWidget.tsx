import "../styles/CloseWidget.css"

interface Props {
  closeSection: () => void;
}

export default function CloseWidget({ closeSection }: Props) {
  return (
    <div onClick={() => closeSection()} className="close-widget">
      ✖
    </div>
  )
}
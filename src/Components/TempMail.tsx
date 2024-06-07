import ActionButtons from "./ActionButtons"
// import CustomEmailModal from "./CustomEmailModal"
import EmailSection from "./EmailSection"
import Inbox from "./Inbox"

const TempMail = () => {
  return (
    <div className="container mx-auto">
      <EmailSection />
      <ActionButtons />
      <Inbox />
    </div>
  )
}

export default TempMail
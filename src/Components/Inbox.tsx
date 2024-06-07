import { Fragment, useEffect, useState } from "react"
import InboxEmpty from "./InboxEmpty"
import { useEmail } from "@/context"
import ViewEmail from "./ViewEmail"
import { IEmail } from "@/lib/types"

const Inbox = () => {
  const { email } = useEmail()
  const [emailList, setEmailList] = useState<IEmail[]>([])
  const [selectedEmail, setSelectedEmail] = useState<IEmail>({} as IEmail)
  const [open, setOpen] = useState(false)

  const emailOnClick = (id: number) => {
    const e = emailList.find(email => email.id === id)
    setSelectedEmail(e!)
    setOpen(true)
  }

  useEffect(() => {
    const e = email.split('@')

    const fetchEmails = async () => {
      const res = await fetch("https://www.1secmail.com/api/v1/?" + new URLSearchParams({ action: 'getMessages', login: e[0], domain: e[1] }))
      const json = await res.json() as IEmail[]

      setEmailList(json)
    }
    fetchEmails()
    const interval = setInterval(() => {
      fetchEmails()
    }, 10000)

    return () => clearInterval(interval)
  }, [email])

  return (
    <Fragment>
      <div className='max-w-5xl mx-auto mt-10'>
        <div className="flex justify-between bg-stone-950 p-5 text-gray-200 rounded-t-lg font-bold">
          <h3>Sender</h3>
          <h3>Subject</h3>
          <h3 className="hidden sm:block">Date</h3>
        </div>

        {/* inbox emails will be displayed here */}
        <div className="h-72 bg-zinc-900 rounded-b-lg overflow-auto custom-scrollbar text-gray-400 ">
          {emailList.length === 0 ? <InboxEmpty /> :
            emailList.map((email, index) => (
              <div
                key={index}
                onClick={() => emailOnClick(email.id)}
                className="flex justify-between p-5 font-semibold border-b border-gray-500 cursor-pointer hover:bg-zinc-800"
              >
                <div className="hover:underline truncate">{email.from}</div>
                <div className="truncate">{email.subject}</div>
                <div className="hidden sm:block">{email.date}</div>
              </div>
            ))}
        </div>
      </div>

      {open && <ViewEmail id={selectedEmail.id} open={open} onOpenChange={setOpen} />}
    </Fragment>
  )
}

export default Inbox
import { domainList } from "@/lib/utils"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { useEffect, useRef, useState } from "react"
import { useEmail } from "@/context"

interface CustomEmailModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

const CustomEmailModal: React.FC<CustomEmailModalProps> = ({ modalOpen, setModalOpen }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [email, SetCustomEmail] = useState("")
  const [domain, setDomain] = useState("1secmail.com")
  const [error, setError] = useState(false)
  const { setEmail } = useEmail()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetCustomEmail(e.target.value)
    
    if (error) {
      setError(false)
    }
  }

  const isValidEmail = (email: string) => {
    switch (email) {
      case "abuse":
      case "webmaster":
      case "contact":
      case "postmaster":
      case "hostmaster":
      case "admin":
        return false
      default:
        return true
    }
  }
  
  const handleCreate = () => {
    if (email.trim() === "") {
      setError(true)
      ref.current?.focus()
      return
    }

    if(isValidEmail(email)) {
      setEmail(`${email}@${domain}`)
      setError(false)
      setModalOpen(false)
    } else {
      setError(true)
      ref.current?.focus()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCreate()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-300">Custom Email</DialogTitle>
          </DialogHeader>
    
          <div>
            <p className={`${error ? "block" : "hidden"} text-red-600 leading-4`}>Invalid Email. Please try again!</p>
            <label className="text-gray-400 font-semibold leading-5">Email</label>
            <input
              ref={ref}
              type="text"
              className={`border border-gray-900 w-full rounded-lg p-3 mt-1  text-lg bg-zinc-900 text-gray-300 font-semibold ${error ? "focus:border-red-600" : "focus:border-violet-600"} focus:outline-none`}
              placeholder="exmaple@gmail.com"
              value={email}
              onChange={onInputChange}
            />
            <DialogDescription className="mb-5">
              Invalid names: abuse, webmaster, contact, postmaster, hostmaster, admin.
            </DialogDescription>

            <label className="text-gray-400 font-semibold leading-5">Domain</label>
            <select 
              className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 border mb-3 mt-1 border-gray-900 focus:border-violet-600 focus:outline-none"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              {domainList.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <DialogFooter className="flex justify-between">
            <button className="bg-violet-600 text-gray-200 p-2 rounded font-semibold hover:bg-violet-800 mt-2 sm:mt-0" onClick={handleCreate}>Create</button>

            <DialogClose asChild>
              <button className="bg-gray-600 text-gray-300 p-2 rounded font-semibold hover:bg-gray-800">Cancel</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default CustomEmailModal
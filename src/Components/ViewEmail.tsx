import { Fragment, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { IEmailDetail } from "@/lib/types"
import { useEmail } from "@/context"
import parse from 'html-react-parser';
import { formatBytes } from "@/lib/utils";

interface DisplayEmailModalProps {
  id: number,
  open: boolean,
  onOpenChange: (open: boolean) => void
}

const ViewEmail: React.FC<DisplayEmailModalProps> = ({ id, open, onOpenChange }) => {
  const { email } = useEmail()
  const [emailDetail, setEmail] = useState<IEmailDetail>({} as IEmailDetail)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) return; // Don't fetch if the modal is not open

    const fetchEmail = async () => {
      try {
        setLoading(true);
        setError(false);

        // Mock email structure for splitting
        const e = email.split('@')

        const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${e[0].toLowerCase()}&domain=${e[1]}&id=${id}`)
        const json = await res.json() as IEmailDetail;

        if (json.id) {
          setEmail(json);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEmail();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-300">View Email</DialogTitle>
        </DialogHeader>

        <div className="text-gray-300">
          {error && <div>Error fetching email</div>}
          {loading && <div>Loading...</div>}
          {!loading && !error && (
            <div>
              <div className="flex justify-between flex-col sm:flex-row">
                <div>From: {emailDetail.from}</div>
                <div>Date: {emailDetail.date}</div>
              </div>
              <div>Subject: {emailDetail.subject}</div>
              <hr className="my-4 hr-text" />
              <div className="mt-4">{parse(emailDetail.body)}</div>
              {emailDetail.attachments.length > 0 &&
                <Fragment>
                  <hr className="my-4 hr-text" />
                  <div className="mt-4">Attachments:</div>
                  <div className="mt-2">
                    {emailDetail.attachments.map((attachment, index) => (
                      <div key={index} className="flex justify-between mb-1">
                        <div>{attachment.filename}</div>
                        <div>{formatBytes(attachment.size)}</div>
                        <div className="bg-blue-600 rounded-md p-1 hover:bg-blue-700">
                          <a href={`https://www.1secmail.com/api/v1/?action=download&login=${email.split('@')[0]}&domain=${email.split('@')[1]}&id=${id}&file=${attachment.filename}`}>Download</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Fragment>
              }
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-4 mt-4">
          <button className="bg-gray-600 text-gray-300 p-2 rounded font-semibold hover:bg-gray-800" onClick={() => onOpenChange(false)}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewEmail;
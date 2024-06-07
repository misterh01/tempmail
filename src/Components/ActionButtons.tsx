import { Fragment, useState } from "react"
import CustomEmailModal from "./CustomEmailModal"
import { useEmail } from "@/context"
import { generateRandomEmail } from "@/lib/utils"
import DeleteModal from "./DeleteModal"

const ActionButtons = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { setEmail } = useEmail()

  const handleNewEmail = () => {
    setEmail(generateRandomEmail())
  }

  const handleDelete = () => {
    handleNewEmail()
    setDeleteModalOpen(false)
  }

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button className="bg-fuchsia-600 text-gray-200 p-2 rounded font-semibold hover:bg-violet-800">Refresh</button>
        <button className="bg-pink-700 text-gray-200 p-2 rounded font-semibold hover:bg-violet-800" onClick={() => setModalOpen(true)}>Custom Email</button>
        <button
          className="bg-rose-700 text-gray-200 p-2 rounded font-semibold hover:bg-violet-800"
          onClick={handleNewEmail}
        >
          New Email
        </button>
        <button 
          className="bg-red-600 text-gray-300 p-2 rounded font-semibold hover:bg-red-800"
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {modalOpen && <CustomEmailModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      {deleteModalOpen && <DeleteModal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} onDelete={handleDelete} />}
    </Fragment>

  )
}

export default ActionButtons
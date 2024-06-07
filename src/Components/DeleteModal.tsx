import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

interface DeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onOpenChange, onDelete }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-300">Delete Email</DialogTitle>
        </DialogHeader>
        <div className="text-gray-300">Are you sure you want to delete this email?</div>
        <DialogFooter className="flex justify-end gap-4 mt-4">
          <button className="bg-red-600 text-gray-300 p-2 rounded font-semibold hover:bg-red-800" onClick={onDelete}>Delete</button>
          <button className="bg-gray-600 text-gray-300 p-2 rounded font-semibold hover:bg-gray-800" onClick={() => onOpenChange(false)}>Cancel</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
import { useState } from "react";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      {/* Button to open the modal */}
      <li
        className="cursor-pointer py-2 text-red-400 hover:text-red-500"
        onClick={handleOpen}
      >
        {title}
      </li>

      {/* Confirmation Modal */}
      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-gray-700">{title}</h3>
            <p className="py-4 text-gray-500">{message}</p>

            <div className="modal-action">
              {/* Cancel Button */}
              <button
                className="btn btn-secondary"
                onClick={() => {
                  onCancel(); // Call the cancel function
                  handleClose();
                }}
              >
                {cancelText}
              </button>

              {/* Confirm Button */}
              <button
                className="btn btn-error"
                onClick={() => {
                  onConfirm(); // Call the confirm function
                  handleClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ConfirmationDialog;

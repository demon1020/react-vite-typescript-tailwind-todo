const LogoutDialog = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div>
      {/* Button to open the modal */}
      <li
        className="cursor-pointer py-2 text-red-400 hover:text-red-500"
        onClick={() => {
          (
            document.getElementById("logout_modal") as HTMLDialogElement
          )?.showModal();
        }}
      >
        Logout
      </li>

      {/* Logout Confirmation Modal */}
      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-gray-700">Confirm Logout</h3>
          <p className="py-4 text-gray-500">
            Are you sure you want to log out?
          </p>

          <div className="modal-action">
            {/* Cancel Button */}
            <form method="dialog">
              <button className="btn btn-secondary">Cancel</button>
            </form>

            {/* Confirm Logout Button */}
            <button
              className="btn btn-error"
              onClick={() => {
                onConfirm(); // Call logout function
                (
                  document.getElementById("logout_modal") as HTMLDialogElement
                )?.close();
              }}
            >
              Confirm Logout
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LogoutDialog;

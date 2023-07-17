const Dialog = ({ children, title, isOpen, closeModal }) => {
  if (!isOpen) {
    return null; // Render nothing if the dialog is closed
  }

  const closeDialog = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={closeDialog}
      ></div>
      <div className="relative rounded-lg bg-white p-6">
        <h3 className="mb-5 text-lg font-medium leading-6 text-gray-900">
          {title}
          <button className="absolute right-0 top-0 p-2" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;

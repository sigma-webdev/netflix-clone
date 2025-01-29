const Dialog = ({ children, title, isOpen, closeModal }) => {
  if (!isOpen) {
    return null; // Render nothing if the dialog is closed
  }

  const closeDialog = () => {
    closeModal();
  };

  return (
    <div className="inset-0 z-50 flex items-center justify-center ">
      <div className="inset-0 bg-black opacity-25 " onClick={closeDialog}></div>
      <div className="relative max-h-[70%] overflow-y-auto rounded-lg bg-white p-6">
        <h3 className="mb-5 text-lg font-medium leading-6 text-gray-900">
          {title}
          <button className="absolute right-0 top-0 p-2" onClick={closeDialog}>
            &times;
          </button>
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;

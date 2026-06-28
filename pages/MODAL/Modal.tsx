
export default function Modal({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white  rounded-lg  shadow-xl p-6">
        <div className=" flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="text-2xl text-gray-500 hover:text-gray-700" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
import type { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <span className="flex flex-col text-center  ">{children}</span>
      </div>
    </div>
  );
};

export default Modal;

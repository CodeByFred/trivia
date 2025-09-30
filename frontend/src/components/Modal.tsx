import type { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" absolute bg-black/[0.78] w-full h-full flex justify-center items-center">
      <div className="absolute bg-black/[0.078] backdrop-blur-[10px] rounded-[1.5rem] w-fit h-fit p-4 ">
        <span className="flex flex-col text-center  ">{children}</span>
      </div>
    </div>
  );
};

export default Modal;

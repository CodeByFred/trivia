import { type ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-full flex flex-col justify-center ">
        <div className="content-overlay h-fit flex flex-col justify-center p-8 gap-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;

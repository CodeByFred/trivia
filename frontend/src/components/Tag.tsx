import type { ReactNode } from "react";

const Tag = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-3 py-1 bg-blend-linear-dodge bg-amber-50/10 rounded-[32.40px] inline-flex justify-start items-center gap-3">
      <div className="text-center justify-center text-zinc-100 text-base font-normal font-['Tilt_Warp'] leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default Tag;

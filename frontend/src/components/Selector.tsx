type SelectorProps = {
  label: string;
  children: React.ReactNode;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Selector = ({ label, children, value, onChange }: SelectorProps) => {
  return (
    <span className="min-w-[565px]  rounded-2xl flex flex-row flex-wrap items-center justify-center px-4 py-2 gap-4">
      <label className="label ">{label}</label>
      <select
        className="select select-primary select-ghost select-xl shadow-none border-0 w-fit min-[565px]:w-full max-w-[400px] "
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </span>
  );
};

export default Selector;

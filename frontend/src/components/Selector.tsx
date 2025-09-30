type SelectorProps = {
  label: string;
  children: React.ReactNode;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Selector = ({ label, children, value, onChange }: SelectorProps) => {
  return (
    <span className="min-w-[300px] w-full rounded-2xl flex flex-row flex-wrap items-center justify-center p-2 gap-4">
      <label className="label ">{label}</label>
      <select
        className="select select-primary rounded-2xl  select-xl shadow-none border-0 min-[300px]:w-full max-w-[565px] "
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </span>
  );
};

export default Selector;

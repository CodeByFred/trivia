type SelectorProps = {
  label: string;
  children: React.ReactNode;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Selector = ({ label, children, value, onChange }: SelectorProps) => {
  return (
    <label className="select select-xl min-w-[565px] w-full select-primary rounded-2xl  focus:ring-0 ">
      <span className="label">{label}</span>
      <select
        className="select select-xl shadow-none border-0 "
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  );
};

export default Selector;

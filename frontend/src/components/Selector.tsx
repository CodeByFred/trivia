type SelectorProps = {
  label: string;
  children: React.ReactNode;
};

const Selector = ({ label, children }: SelectorProps) => {
  return (
    <label className="select select-xl min-w-[565px] select-primary">
      <span className="label">{label}</span>
      {children}
    </label>
  );
};

export default Selector;

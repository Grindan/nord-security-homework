import { FC } from 'react';

type Props = {
  name: string;
  label: string;
  type: string;
  onChange: () => void;
  className?: string;
};

const Input: FC<Props> = ({ name, label, type, onChange, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-slate-600 mb-1">{label}</label>
      <input
        className="
          rounded-lg w-full text-lg text-slate-500 border border-slate-400 outline-none py-1 px-3
          focus:border-blue-400 focus:shadow focus:shadow-slate-300"
        type={type}
      />
    </div>
  );
};

export default Input;

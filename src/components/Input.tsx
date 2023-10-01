import { ChangeEvent, FC } from 'react';
import { FieldProps } from 'formik';

type Props = {
  name: string;
  label: string;
  type: string;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: ChangeEvent) => void;
  className?: string;
  value: string;
  error?: string | boolean;
};

const Input: FC<Props & FieldProps> = ({ field, label, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-slate-600 mb-1">{label}</label>
      <input
        {...field}
        id={field.name}
        placeholder={label}
        className="
          rounded-lg w-full text-lg text-slate-500 border border-slate-400 outline-none py-1 px-3
          focus:border-blue-400 focus:shadow focus:shadow-slate-300"
      />
    </div>
  );
};

export default Input;

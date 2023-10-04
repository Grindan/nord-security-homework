import { FC } from 'react';
import { FieldProps } from 'formik';

type Props = {
  label: string;
  className?: string;
  error?: string | boolean;
};

const Text: FC<Props & FieldProps> = ({
  field,
  label,
  error,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm text-slate-600 mb-1">{label}</label>
      <input
        {...field}
        id={field.name}
        type="text"
        placeholder={label}
        className="
          rounded-lg w-full text-lg text-slate-500 border border-slate-400 outline-none py-1 px-3
          focus:border-blue-400 focus:shadow focus:shadow-slate-300"
      />
      <p className="ml-3 mt-1 h-[20px] text-sm text-red-600">{error}</p>
    </div>
  );
};

export default Text;

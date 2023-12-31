import { FC, useState } from 'react';
import { FieldProps } from 'formik';
import EyeIcon from '../icons/EyeIcon';

type Props = {
  label: string;
  className?: string;
  error?: string | boolean;
};

const Password: FC<Props & FieldProps> = ({
  field,
  label,
  error,
  className = '',
}) => {
  const [isShown, setIsShown] = useState(false);

  const toggleShown = () => {
    setIsShown(!isShown);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={field.name} className="text-sm text-slate-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          id={field.name}
          type={isShown ? 'text' : 'password'}
          role="textbox"
          placeholder={label}
          className="
          rounded-lg w-full text-lg text-slate-500 border border-slate-400 outline-none py-1 pl-3 pr-[40px]
          focus:border-blue-400 focus:shadow focus:shadow-slate-300"
        />
        <EyeIcon
          role="button"
          tabIndex={0}
          isOpen={isShown}
          onClick={toggleShown}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              toggleShown();
            }
          }}
          className="absolute right-[10px] top-[6px] outline-1 outline-blue-400"
        />
      </div>
      <p className="ml-3 mt-1 h-[20px] text-sm text-red-600">{error}</p>
    </div>
  );
};

export default Password;

import { FC, HTMLAttributes } from 'react';

const ChevronDownIcon: FC<HTMLAttributes<SVGSVGElement>> = ({
  className,
  ...otherProps
}) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[24px] h-[24px] ${className}`}
      {...otherProps}
    >
      <g>
        <path
          id="Vector"
          d="M19 9L12 16L5 9"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ChevronDownIcon;

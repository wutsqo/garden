import { mergeClassname } from "@utils/merge-classname";
import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div className={mergeClassname("w-full", className)}>
      {label && (
        <label className="text-base" htmlFor={id}>
          <span>{label}</span>
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        className="px-4 py-2 w-full border border-black rounded bg-gray-100 focus:outline-hidden focus:ring-1 focus:ring-bluish-purple"
        {...props}
      />
    </div>
  );
};

export default Input;

import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-base" htmlFor={id}>
          <span>{label}</span>
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type="text"
        className="px-4 py-2 w-full border-2 border-black rounded bg-gray-100"
        {...props}
      />
    </div>
  );
};

export default Input;

import { FC, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: FC<TextAreaProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-base" htmlFor={id}>
          <span>{label}</span>
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        className="px-4 py-2 w-full border border-black rounded bg-gray-100"
        {...props}
      />
    </div>
  );
};

export default Textarea;

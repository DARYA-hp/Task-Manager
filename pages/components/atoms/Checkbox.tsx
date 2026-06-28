import { InputHTMLAttributes } from "react";
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, id }: CheckboxProps) {
  return (
    <>
      <div className="flex flex-row gap-2">
        <input type="checkbox" id={id} />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  )
}
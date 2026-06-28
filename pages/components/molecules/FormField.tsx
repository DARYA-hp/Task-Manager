import { Input } from "../atoms/Input";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  field?: any;
  form?: any;
}

export function FormField({ label, id, type = "text", placeholder, field, form, ...rest }: FormFieldProps) {
  const inputProps = field && form ? { ...field, ...rest } : { ...rest };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
        <Input id={id} type={type} placeholder={placeholder}  {...inputProps} />
      </div>
    </>
  );
}
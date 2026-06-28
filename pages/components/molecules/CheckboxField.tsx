import { Checkbox } from "../atoms/Checkbox";

interface CheckboxFieldProps {
  label: string;
  id: string;
}

export function CheckboxField({ label, id }: CheckboxFieldProps) {
  return <Checkbox label={label} id={id} />;
}
import { ChangeEvent } from "react";
// import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProps = {
  label: string;
  required: boolean;
  type: string;
  name: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line no-unused-vars
const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div>FormInput</div>
    // <Group>
    //   <Input {...otherProps} />

    //   {label && (
    //     <FormInputLabel shrink={otherProps.value.length}>
    //       {label}
    //     </FormInputLabel>
    //   )}
    // </Group>
  );
};

export default FormInput;

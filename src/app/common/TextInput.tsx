import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
`;

const RequiredText = styled.div`
  font-size: 0.75rem;
  color: #ed262a;
`;

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
}

const Input = styled.input<{ hasError: boolean }>`
  display: block;
  width: 100%;
  font-size: 1rem;
  border: 2px solid ${(props) => (props.hasError ? "red" : "blue")};
`;

export const TextInput: React.FC<Props> = ({
  label,
  name,
  required,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  return (
    <div>
      <Info>
        <Label htmlFor={name}>{label}</Label>
        {required && <RequiredText>Required</RequiredText>}
      </Info>
      <Input
        id={name}
        type="text"
        autoComplete="off"
        hasError={Boolean(meta.error) && meta.touched}
        {...field}
        {...rest}
      />
    </div>
  );
};

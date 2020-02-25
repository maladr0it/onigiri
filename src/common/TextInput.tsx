import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { theme } from "../theme";

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

const Input = styled.input<{ hasError: boolean }>`
  display: block;
  width: 100%;
  font-size: 1rem;
  border: 2px solid ${(props) => (props.hasError ? theme.red : theme.lightGrey)};
  border-radius: 2px;
  padding: 0.5rem;

  &:placeholder {
    color: #c4c4c4;
  }
`;

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
}

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

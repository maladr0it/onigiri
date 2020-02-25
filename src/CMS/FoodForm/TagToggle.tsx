import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { theme } from "../../theme";

const Label = styled.label`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background: red;
`;

const Input = styled.input``;

interface Props {
  name: string;
  value: string;
}

export const TagToggle: React.FC<Props> = ({ name, value }) => {
  const [field] = useField({ name, value, type: "checkbox" });

  return (
    <Label>
      <Input type="checkbox" {...field} />
    </Label>
  );
};

import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import Check from "../assets/check-solid.svg";

interface Props {
  name: string;
  value: string;
}

const Label = styled.label`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-color: #ededed;
  overflow: hidden;
  border-radius: 50%;
`;

const Input = styled.input`
  display: none;
  & + * {
    opacity: 0;
  }
  &:checked + * {
    opacity: 1;
  }
`;

const CheckContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: #03ad00;
`;

const CheckIcon = styled(Check)`
  display: inline-block;
  color: #fff;
  height: 2rem;
`;

export const ToggleButton: React.FC<Props> = ({ name, value }) => {
  const [field] = useField({ name, value, type: "checkbox" });

  return (
    <Label>
      <Input type="checkbox" {...field} />
      <CheckContainer>
        <CheckIcon />
      </CheckContainer>
    </Label>
  );
};

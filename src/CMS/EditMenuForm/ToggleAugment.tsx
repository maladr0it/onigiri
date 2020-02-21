import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import Check from "../../assets/check-solid.svg";
import { theme } from "../../theme";

const Container = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.checked ? theme.faintGreen : theme.lightGrey};
`;

const Label = styled.label`
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
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
  background-color: ${theme.lightGreen};
`;

const CheckIcon = styled(Check)`
  display: inline-block;
  color: #fff;
  width: 1.5rem;
`;

interface Props {
  name: string;
  value: string;
}

export const ToggleAugment: React.FC<Props> = ({ name, value }) => {
  const [field] = useField({ name, value, type: "checkbox" });

  return (
    <Container checked={field.checked}>
      <Label>
        <Input type="checkbox" {...field} />
        <CheckContainer>
          <CheckIcon />
        </CheckContainer>
      </Label>
    </Container>
  );
};

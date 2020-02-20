import React from "react";
import styled from "styled-components";

import { TextInput } from "../../common/TextInput";
import { ImageUpload } from "./ImageUpload";

const Form = styled.form`
  background: red;
`;

export interface FormValues {
  name: string;
  imageUrl?: string;
  imageUpload: File | null;
}

interface Props {
  title: string;
  values: FormValues;
  onSubmit: () => void;
  onCancelClick: () => void;
}

export const FoodForm: React.FC<Props> = ({
  title,
  values,
  onSubmit,
  onCancelClick,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <TextInput label="Name" name="name" />
      <ImageUpload imageUrl={values.imageUrl} />
      <button type="submit">SUBMIT</button>
      <button type="button" onClick={onCancelClick}>
        CANCEL
      </button>
    </Form>
  );
};

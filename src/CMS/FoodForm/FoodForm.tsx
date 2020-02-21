import React from "react";
import styled from "styled-components";

import { PageHeader } from "../../common/PageHeader";
import { PageFooter } from "../../common/PageFooter";
import { TextInput } from "../../common/TextInput";
import { PrimaryButton } from "../../common/PrimaryButton";
import { ImageUpload } from "./ImageUpload";

const Form = styled.form`
  min-height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1rem;
`;

const SubmitButton = styled(PrimaryButton)`
  margin: 0.5rem 2rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

export interface FormValues {
  name: string;
  imageUrl?: string;
  imageUpload: File | null;
}

interface Props {
  title: string;
  submitLabel: string;
  values: FormValues;
  onSubmit: () => void;
}

export const FoodForm: React.FC<Props> = ({
  title,
  submitLabel,
  values,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PageHeader title={title} backButton />
      <FormContent>
        <TextInput
          label="Name of food"
          name="name"
          placeholder="Enter food name"
          required
        />
        <ImageUpload imageUrl={values.imageUrl} />
      </FormContent>
      <PageFooter>
        <SubmitButton type="submit">{submitLabel}</SubmitButton>
      </PageFooter>
    </Form>
  );
};

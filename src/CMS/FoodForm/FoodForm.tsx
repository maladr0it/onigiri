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
  grid-gap: 0.25rem;
`;

const SubmitButton = styled(PrimaryButton)`
  margin: 0.5rem 2rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 0.25rem;
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
      <Content>
        <TextInput
          label="Name of food"
          name="name"
          placeholder="Enter food name"
          required
        />
        <ImageUpload imageUrl={values.imageUrl} />
      </Content>
      <PageFooter>
        <SubmitButton type="submit">{submitLabel}</SubmitButton>
      </PageFooter>
    </Form>
  );
};

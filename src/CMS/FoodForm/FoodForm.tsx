import React from "react";
import styled from "styled-components";

import { PageHeader } from "../../common/PageHeader";
import { PageFooter } from "../../common/PageFooter";
import { TextInput } from "../../common/TextInput";
import { PrimaryButton } from "../../common/PrimaryButton";
import { SecondaryButton } from "../../common/SecondaryButton";
import { TagInput } from "./TagInput";
import { ImageUpload } from "./ImageUpload";

const Form = styled.form`
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 0.25rem;
`;

const DeleteButton = styled(SecondaryButton)`
  margin: 0.5rem 2rem;
`;

const SubmitButton = styled(PrimaryButton)`
  margin: 0.5rem 2rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-gap: 0.25rem;
  padding: 0 0.25rem;
`;

export interface FormValues {
  name: string;
  imageUrl?: string;
  imageUpload: File | null;
  tags: [];
}

interface Props {
  title: string;
  submitLabel: string;
  values: FormValues;
  onSubmit: () => void;
  onDeleteClick?: () => void;
}

export const FoodForm: React.FC<Props> = ({
  title,
  submitLabel,
  values,
  onSubmit,
  onDeleteClick,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <>
      <PageHeader title={title} backButton />
      <Form onSubmit={handleSubmit}>
        <Content>
          <TextInput
            label="Name of food"
            name="name"
            placeholder="Enter food name"
            required
          />
          {/* <TagInput label="Tags" name="tags" /> */}
          <ImageUpload imageUrl={values.imageUrl} />
        </Content>
        <PageFooter>
          {onDeleteClick && (
            <DeleteButton type="button" onClick={onDeleteClick}>
              Delete Item
            </DeleteButton>
          )}
          <SubmitButton type="submit">{submitLabel}</SubmitButton>
        </PageFooter>
      </Form>
    </>
  );
};

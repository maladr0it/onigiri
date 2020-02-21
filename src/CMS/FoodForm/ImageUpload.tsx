import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useField } from "formik";

import { theme } from "../../theme";
import { FormValues } from "./FoodForm";

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const PreviewContainer = styled.div`
  height: 10rem;
  width: 10rem;
  background-color: ${theme.darkGrey};
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  imageUrl?: string;
}

export const ImageUpload: React.FC<Props> = ({ imageUrl }) => {
  const [field, _, helpers] = useField<FormValues["imageUpload"]>({
    name: "imageUpload",
  });
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (!field.value) {
      setThumbnail(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(field.value as Blob);
  }, [field.value]);

  const renderPreview = () => {
    if (thumbnail) {
      return <Preview src={thumbnail} alt="Preview of uploaded image" />;
    } else if (imageUrl) {
      return <Preview src={imageUrl} alt="Preview of current image" />;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Label>Image Upload</Label>
      <PreviewContainer>{renderPreview()}</PreviewContainer>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) {
            helpers.setValue(file);
          }
        }}
      />
    </div>
  );
};

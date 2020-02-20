import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useField } from "formik";

import { FormValues } from "./EditFoodForm";

const PreviewContainer = styled.div`
  height: 10rem;
  width: 10rem;
  background: grey;
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
      <h2>Image Upload</h2>
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

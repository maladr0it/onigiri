import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
}

export const ImageUpload: React.FC<Props> = ({ name }) => {
  const [field, _, helpers] = useField({
    name,
    type: "file",
  });

  return (
    <div>
      <h2>Image Upload</h2>
      <input
        type="file"
        onChange={(e) => {
          helpers.setValue(e.currentTarget.files?.[0] || null);
        }}
      />
    </div>
  );
};

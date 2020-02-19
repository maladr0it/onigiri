import React from "react";
import { useFormik, FormikProvider } from "formik";

import { db, storage } from "../services";
import { ImageUpload } from "./ImageUpload";

interface FormValues {
  name?: string;
  imageUrl?: string;
  imageUpload: File | null;
}

export const EditItemForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      imageUrl: "",
      imageUpload: null,
    },
    onSubmit: async (values) => {
      const { imageUpload, imageUrl, ...rest } = values;

      let url = imageUrl;
      if (imageUpload) {
        url = await storage.uploadMenuItem(imageUpload);
        console.log(url);
      }

      db.addFoodItem({ imageUrl: url, ...rest });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <h1>Form</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          {...formik.getFieldProps("name")}
        />
        <ImageUpload name="imageUpload" imageUrl={formik.values.imageUrl} />
        <button type="submit">Submit</button>
      </form>
    </FormikProvider>
  );
};

import React from "react";
import { useFormik, FormikProvider, FormikErrors } from "formik";

import { db, storage } from "../services";
import { TextInput } from "./TextInput";
import { ImageUpload } from "./ImageUpload";

interface FormValues {
  name: string;
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

    validate: (values) => {
      const errors: FormikErrors<typeof values> = {};
      if (!values.name) {
        errors.name = "Please give this item a name.";
      }
      return errors;
    },

    onSubmit: async (values) => {
      console.log("submitting...");

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
        <TextInput label="Name" name="name" />
        <ImageUpload name="imageUpload" imageUrl={formik.values.imageUrl} />
        <button type="submit">Submit</button>
      </form>
    </FormikProvider>
  );
};

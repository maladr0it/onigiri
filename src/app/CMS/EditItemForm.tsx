import React from "react";
import { useFormik, FormikProvider } from "formik";

import { storage } from "../services";
import { ImageUpload } from "./ImageUpload";

export const EditItemForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    onSubmit: (values) => {
      console.log(values);
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
        <ImageUpload name="image" />
        <button type="submit">Submit</button>
      </form>
    </FormikProvider>
  );
};

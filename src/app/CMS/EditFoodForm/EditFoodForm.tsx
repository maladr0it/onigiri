import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useFormik, FormikProvider, FormikErrors } from "formik";

import { db, storage } from "../../services";
import { TextInput } from "../TextInput";
import { ImageUpload } from "./ImageUpload";
import { useFoodData } from "../../useFoodData";

const Form = styled.form``;

interface RouteParams {
  id: string;
}

export interface FormValues {
  name: string;
  imageUrl?: string;
  imageUpload: File | null;
}

export const EditFoodForm = () => {
  const history = useHistory();
  const match = useRouteMatch<RouteParams>();
  const id = match.params.id;

  const { isLoading, payload } = useFoodData(id);

  const exit = () => {
    history.goBack();
  };

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
      }
      const data = { imageUrl: url, ...rest };

      if (payload) {
        db.setFoodItem(id, data);
        exit();
      } else {
        db.addFoodItem(data);
        exit();
      }
    },
  });

  // Set the form values if there is payload data
  useEffect(() => {
    if (payload) {
      formik.setValues({
        ...formik.values,
        ...payload,
      });
    }
  }, [payload]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <FormikProvider value={formik}>
      {!isLoading && (
        <Form style={{ background: "red" }} onSubmit={handleSubmit}>
          <h1>{payload ? "Edit food" : "Add new food"}</h1>
          <TextInput label="Name" name="name" />
          <ImageUpload imageUrl={formik.values.imageUrl} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </FormikProvider>
  );
};

import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useFormik, FormikProvider, FormikErrors } from "formik";

import { db, storage } from "../../services";
import { useFoodData } from "../../useFoodData";

import { FoodForm, FormValues } from "./FoodForm";

export const NewFoodForm = () => {
  const history = useHistory();

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
      const { imageUpload, imageUrl, ...rest } = values;
      let url = imageUrl;
      if (imageUpload) {
        url = await storage.uploadMenuItem(imageUpload);
      }
      const data = { imageUrl: url, ...rest };

      db.addFoodItem(data);
      exit();
    },
  });

  return (
    <FormikProvider value={formik}>
      <FoodForm
        title="Add new food"
        values={formik.values}
        onSubmit={formik.handleSubmit}
        onCancelClick={exit}
      />
    </FormikProvider>
  );
};

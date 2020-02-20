import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useFormik, FormikProvider, FormikErrors } from "formik";

import { db, storage } from "../../services";
import { useFoodData } from "../../useFoodData";
import { FoodForm, FormValues } from "./FoodForm";

interface RouteParams {
  id: string;
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
      // Payload will always exist
      if (!payload) return;

      const { imageUpload, imageUrl, ...rest } = values;
      let url = imageUrl;
      if (imageUpload) {
        url = await storage.uploadMenuItem(imageUpload);
      }
      const data = { imageUrl: url, ...rest };

      db.setFoodItem(id, data);
      exit();
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

  return (
    <FormikProvider value={formik}>
      {!isLoading && payload && (
        <FoodForm
          title="Edit food"
          values={formik.values}
          onSubmit={formik.handleSubmit}
          onCancelClick={exit}
        />
      )}
    </FormikProvider>
  );
};

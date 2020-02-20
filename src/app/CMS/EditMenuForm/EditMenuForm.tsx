import React from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import { MenuPreview } from "./MenuPreview";
import { FoodList } from "./FoodList";

export interface FormValues {
  added: string[];
}

interface RouteParams {
  id: string;
}

interface Props {}

export const EditMenuForm: React.FC<Props> = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      added: [],
    },

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const match = useRouteMatch<RouteParams>();
  const id = match.params.id;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <h1>Editing menu {id}</h1>
        <MenuPreview />
        <hr />
        <FoodList />
        <button type="submit">SUBMIT</button>
      </form>
    </FormikProvider>
  );
};

import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import { useMenuData } from "../../useMenuData";
import { MenuPreview } from "./MenuPreview";
import { FoodList } from "./FoodList";

const Form = styled.form`
  min-height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 0.5rem;
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
`;

export interface FormValues {
  added: string[];
}

interface RouteParams {
  id: string;
}

interface Props {}

export const EditMenuForm: React.FC<Props> = () => {
  const match = useRouteMatch<RouteParams>();
  const id = match.params.id;

  const { isLoading, payload } = useMenuData(id);

  const formik = useFormik<FormValues>({
    initialValues: {
      added: [],
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // TODO: try to avoid updating state in response to state update
  useEffect(() => {
    if (payload) {
      formik.setValues({
        added: payload.items,
      });
    }
  }, [payload]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  console.log(payload);

  return (
    <FormikProvider value={formik}>
      {!isLoading && payload && (
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>Editing menu {id}</h1>
            <FoodList />
          </div>
          <Footer>
            <MenuPreview />
            <button type="submit">SUBMIT</button>
          </Footer>
        </Form>
      )}
    </FormikProvider>
  );
};

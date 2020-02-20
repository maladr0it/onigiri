import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import { db } from "../../services";
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
  date: string;
}

interface Props {}

export const EditMenuForm: React.FC<Props> = () => {
  const history = useHistory();
  const match = useRouteMatch<RouteParams>();
  const date = parseInt(match.params.date);

  const { isLoading, payload } = useMenuData(date);

  const isNewMenu = !isLoading && !payload;

  const exit = () => {
    history.push(`/cms/menus/${date}`);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      added: [],
    },
    onSubmit: async (values) => {
      if (payload) {
        await db.setMenuItems(payload.id, values.added);
        exit();
      } else {
        await db.addMenu({ date, items: values.added });
        exit();
      }
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

  return (
    <FormikProvider value={formik}>
      {!isLoading && (
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>{payload ? "Edit menu" : "Create menu"}</h1>
            <FoodList />
          </div>
          <Footer>
            <MenuPreview />
            <button type="submit">SUBMIT</button>
            <button type="button" onClick={exit}>
              CANCEL
            </button>
          </Footer>
        </Form>
      )}
    </FormikProvider>
  );
};

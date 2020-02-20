import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import { db } from "../../services";
import { useMenuData } from "../../useMenuData";
import { PrimaryButton } from "../../common/PrimaryButton";
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
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.25);
`;

const Prompt = styled.div`
  padding: 0.5rem 0;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  background-color: #03ad00;
`;

const Controls = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 0.5rem;
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

  const handleAddItemClick = () => {
    history.push("/cms/addfood");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  // Set the form values if there is payload data
  // TODO: try to avoid updating state in response to state update
  useEffect(() => {
    if (payload) {
      formik.setValues({
        added: payload.items,
      });
    }
  }, [payload]);

  return (
    <FormikProvider value={formik}>
      {!isLoading && (
        <Form onSubmit={handleSubmit}>
          <div>
            <h1>{payload ? "Edit menu" : "Create new menu"}</h1>
            {/* TODO: add new food should be a nested route so that form state is preserved */}
            <button type="button" onClick={handleAddItemClick}>
              Add new food item
            </button>
            <FoodList />
          </div>
          <Footer>
            <Prompt>
              <h1>Menu for XXX</h1>
            </Prompt>
            <Controls>
              <MenuPreview />
              <PrimaryButton type="submit">
                {payload ? "Update menu" : "Create Menu"}
              </PrimaryButton>
              <button type="button" onClick={exit}>
                Cancel
              </button>
            </Controls>
          </Footer>
        </Form>
      )}
    </FormikProvider>
  );
};

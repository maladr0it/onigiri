import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";

import { db } from "../../services";
import { useMenuData } from "../../useMenuData";
import { PageHeader } from "../../common/PageHeader";
import { PageFooter } from "../../common/PageFooter";
import { PrimaryButton } from "../../common/PrimaryButton";
import { SecondaryButton } from "../../common/SecondaryButton";
import { MenuPreview } from "./MenuPreview";
import { AllFoodList } from "./AllFoodList";

const Form = styled.form`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 0.25rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 0.25rem;
`;

const AddButton = styled(SecondaryButton)`
  margin: 0 2rem;
`;

const Controls = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 0.5rem;
`;

const ActionButton = styled(PrimaryButton)`
  margin: 0 2rem;
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
          <PageHeader
            title={payload ? "Edit menu" : "Create new menu"}
            backButton
          />
          <Content>
            {/* TODO: add new food should be a nested route so that form state is preserved */}
            <AddButton type="button" onClick={handleAddItemClick}>
              Add new food item
            </AddButton>
            <AllFoodList />
          </Content>
          <PageFooter>
            <Controls>
              <MenuPreview />
              <ActionButton type="submit">
                {payload ? "Update menu" : "Create Menu"}
              </ActionButton>
            </Controls>
          </PageFooter>
        </Form>
      )}
    </FormikProvider>
  );
};

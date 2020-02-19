import React from "react";

import { EditItemForm } from "./EditItemForm";
import { FoodList } from "./FoodList";

export const CMS = () => {
  return (
    <>
      <h2>CMS Page</h2>
      <hr />
      <EditItemForm />
      <hr />
      <FoodList />
    </>
  );
};

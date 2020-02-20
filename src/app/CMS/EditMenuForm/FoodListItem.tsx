import React from "react";
import styled from "styled-components";
import { useField } from "formik";

import { FoodItem } from "../../common/FoodItem";

const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

interface Props extends React.ComponentProps<typeof FoodItem> {}

export const FoodListItem: React.FC<Props> = ({ id, data }) => {
  const [field] = useField({ name: "added", value: id, type: "checkbox" });

  // console.log(field);

  return (
    <Item>
      <FoodItem key={id} id={id} data={data} />
      <input type="checkbox" {...field} />
    </Item>
  );
};

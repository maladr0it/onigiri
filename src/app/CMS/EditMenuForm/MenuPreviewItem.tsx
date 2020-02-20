import React from "react";
import styled from "styled-components";

import { useFoodData } from "../../useFoodData";

interface Props {
  id: string;
  onRemoveClick: (id: string) => void;
}

export const MenuPreviewItem: React.FC<Props> = ({ id, onRemoveClick }) => {
  const { data } = useFoodData(id);

  return (
    <li>
      id:{id}
      <button type="button" onClick={() => onRemoveClick(id)}>
        Remove
      </button>
      {/* <img src={data?.imageUrl} /> */}
    </li>
  );
};

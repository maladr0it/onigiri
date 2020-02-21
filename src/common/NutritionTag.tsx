import React from "react";
import styled from "styled-components";

export type ITag = "vegan" | "gluten_free";

const Tag = styled.li`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
`;

interface Props {
  type: ITag;
}

export const NutritionTag: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "vegan":
      return (
        <Tag style={{ backgroundColor: "#9CE8CD", color: "#00825F" }}>
          Vegan
        </Tag>
      );

    case "gluten_free":
      return (
        <Tag style={{ backgroundColor: "#FFF39A", color: "#C2A70B" }}>
          Gluten Free
        </Tag>
      );
  }
};

import React from "react";
import styled from "styled-components";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Header = styled.header`
  text-align: center;
  padding: 0.5rem;
`;

interface Props {
  day: number;
}

export const MenuTitle: React.FC<Props> = ({ day }) => {
  return (
    <Header>
      <h1>{DAYS[new Date(day).getUTCDay()]}'s Menu</h1>
    </Header>
  );
};

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import LeftChevron from "../assets/chevron-left-solid.svg";
import { theme } from "../theme";

const Header = styled.header`
  display: grid;
  grid-gap: 1rem;
  padding: 0.75rem;
  z-index: 100;
  color: #fff;
  background: ${theme.red};
  position: sticky;
  top: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
`;

const Strip = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "left middle right";
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  grid-area: middle;
`;

const BackButton = styled.button`
  justify-self: flex-start;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
`;

const LeftChevronIcon = styled(LeftChevron)`
  height: 1.5rem;
  color: #fff;
`;

interface Props {
  title: string;
  backButton?: boolean;
}

export const PageHeader: React.FC<Props> = ({
  title,
  backButton,
  children,
}) => {
  const history = useHistory();

  return (
    <Header>
      <Strip>
        {backButton && (
          <BackButton onClick={() => history.goBack()}>
            <LeftChevronIcon />
          </BackButton>
        )}
        <Heading>{title}</Heading>
      </Strip>
      {children && <div>{children}</div>}
    </Header>
  );
};

import styled from "styled-components";

import { theme } from "../theme";

export const PageFooter = styled.footer`
  position: sticky;
  bottom: 0;
  display: grid;
  background-color: ${theme.faintRed};
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.07);
`;

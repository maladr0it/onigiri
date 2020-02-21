import styled from "styled-components";

import { theme } from "../theme";

export const SecondaryButton = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid ${theme.textOnBg};
  border-radius: 999px;
  padding: 0.5rem 0.5rem;
  margin: 0;
  background-color: #fff;
  color: ${theme.textOnBg};
`;

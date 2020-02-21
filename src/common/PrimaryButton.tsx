import styled from "styled-components";

import { theme } from "../theme";

export const PrimaryButton = styled.button`
  font-size: 1.2rem;
  font-weight: bold;
  border: 3px solid ${theme.red};
  border-radius: 999px;
  padding: 0.5rem 0.5rem;
  margin: 0;
  background-color: #fff;
  color: ${theme.red};
`;

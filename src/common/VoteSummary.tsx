import React from "react";
import styled from "styled-components";

import ThumbsUp from "../assets/thumbs-up.svg";
import { theme } from "../theme";
import { FlexRow } from "./FlexRow";

const Container = styled(FlexRow)`
  font-size: 0.75rem;
  color: ${theme.textOnBg};
`;

const ThumbsUpIcon = styled(ThumbsUp)`
  width: 1rem;
  height: 1rem;
`;

const Rating = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const TotalVotes = styled.span`
  font-size: 0.75rem;
`;

interface Props {
  upvotes: number;
  downvotes: number;
}

export const VoteSummary: React.FC<Props> = ({ upvotes, downvotes }) => {
  const totalVotes = upvotes + downvotes;
  const ratingPerc = Math.round((upvotes / totalVotes) * 100);

  return (
    <Container gap="0.25rem">
      <span>
        <ThumbsUpIcon />
      </span>
      <Rating>{ratingPerc}%</Rating>
      <TotalVotes>({totalVotes})</TotalVotes>
    </Container>
  );
};

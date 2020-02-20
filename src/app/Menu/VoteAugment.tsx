import React, { useState } from "react";
import styled from "styled-components";

import ThumbsUp from "../assets/thumbs-up-solid.svg";
import { theme } from "../theme";

type Vote = -1 | 0 | 1;

const getBg = (vote: Vote) => {
  switch (vote) {
    case -1:
      return theme.faintRed;
    case 0:
      return theme.lightGrey;
    case 1:
      return theme.faintGreen;
  }
};

const Container = styled.div<{ vote: Vote }>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  background-color: ${(props) => getBg(props.vote)};
`;

const IconButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ThumbsUpIcon = styled(ThumbsUp)<{ selected: boolean }>`
  width: 2rem;
  color: ${(props) => (props.selected ? theme.lightGreen : theme.darkGrey)};
`;

const ThumbsDownIcon = styled(ThumbsUp)<{ selected: boolean }>`
  width: 2rem;
  color: ${(props) => (props.selected ? theme.lightRed : theme.darkGrey)};
  transform: rotate(180deg);
`;

export const VoteAugment = () => {
  const [vote, setVote] = useState<Vote>(0);

  const handleVoteClick = (value: Vote) => {
    if (vote === value) {
      setVote(0);
    } else {
      setVote(value);
    }
  };

  return (
    <Container vote={vote}>
      <IconButton onClick={() => handleVoteClick(1)}>
        <ThumbsUpIcon selected={vote === 1} />
      </IconButton>
      <IconButton onClick={() => handleVoteClick(-1)}>
        <ThumbsDownIcon selected={vote === -1} />
      </IconButton>
    </Container>
  );
};

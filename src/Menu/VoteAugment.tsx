import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";

import ThumbsUp from "../assets/thumbs-up.svg";
import { db } from "../services";
import { theme } from "../theme";

type Vote = "up" | "down";

const Container = styled.div<{ vote: Vote | null }>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  background-color: ${(props) => {
    if (props.vote === "up") {
      return theme.faintGreen;
    }
    if (props.vote === "down") {
      return theme.faintRed;
    }
    return theme.lightGrey;
  }};
`;

const IconButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
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

interface Props {
  id: string;
}

export const VoteAugment: React.FC<Props> = ({ id }) => {
  const [vote, setVote] = useState<Vote | null>(null);

  // use Layout so the ui is never visible in the abusable state
  useLayoutEffect(() => {
    const vote = (localStorage.getItem(id) || null) as Vote | null;
    setVote(vote);
  }, []);

  const handleVoteClick = async (value: Vote) => {
    const from = vote;
    let to: Vote | null;
    if (vote === value) {
      to = null;
    } else {
      to = value;
    }

    await db.vote(id, from, to);
    // set local storage
    localStorage.setItem(id, to || "");
    setVote(to);
  };

  return (
    <Container vote={vote}>
      <IconButton onClick={() => handleVoteClick("up")}>
        <ThumbsUpIcon selected={vote === "up"} />
      </IconButton>
      <IconButton onClick={() => handleVoteClick("down")}>
        <ThumbsDownIcon selected={vote === "down"} />
      </IconButton>
    </Container>
  );
};

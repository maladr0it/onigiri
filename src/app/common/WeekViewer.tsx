import React from "react";
import styled from "styled-components";

import Onigiri from "../assets/onigiri.svg";
import { theme } from "../theme";

const SHORT_DAYS = ["ERROR_SUNDAY", "M", "T", "W", "H", "F", "ERROR_SATURDAY"];

const DayList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  grid-gap: 0.5rem;
`;

const DayButton = styled.button<{ selected: boolean }>`
  position: relative;
  padding: 0;
  background-color: transparent;
  border: none;
`;

const OnigiriIcon = styled(Onigiri)`
  width: 3.5rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const DayLabel = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => (props.selected ? theme.red : theme.darkGrey)};
`;

interface Props {
  days: number[];
  selectedDay: number;
  onDayClick: (day: number) => void;
}

export const WeekViewer: React.FC<Props> = ({
  days,
  selectedDay,
  onDayClick,
}) => {
  return (
    <DayList>
      {days.map((day, i) => (
        <li key={i}>
          <DayButton
            selected={day === selectedDay}
            onClick={() => onDayClick(day)}
          >
            <OnigiriIcon />
            <DayLabel selected={day === selectedDay}>
              {SHORT_DAYS[new Date(day).getUTCDay()]}
            </DayLabel>
          </DayButton>
        </li>
      ))}
    </DayList>
  );
};

import React from "react";
import styled from "styled-components";

const SHORT_DAYS = ["ERROR_SUNDAY", "M", "T", "W", "H", "F", "ERROR_SATURDAY"];

const DayList = styled.ul`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  grid-gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 4px solid #c4c4c4;
  background-color: #fff;
`;

const DayButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#03AD00" : "#c4c4c4")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  padding: 0;
  height: 3rem;
  width: 3rem;
  border: none;
  border-radius: 50%;
  font-size: 1.8rem;
  font-weight: bold;
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
            {SHORT_DAYS[new Date(day).getUTCDay()]}
          </DayButton>
        </li>
      ))}
    </DayList>
  );
};

import React from "react";
import styled from "styled-components";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const DayList = styled.ul`
  display: flex;
`;

const DayButton = styled.button<{ selected: boolean }>`
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

interface Props {
  days: number[];
  selectedDay: number;
  onDayClick: (day: number) => void;
}

export const DaysOfWeek: React.FC<Props> = ({
  days,
  selectedDay,
  onDayClick,
}) => {
  return (
    <>
      <h3>Days</h3>
      <DayList>
        {days.map((day, i) => (
          <li key={i}>
            <DayButton
              selected={day === selectedDay}
              onClick={() => onDayClick(day)}
            >
              {DAYS[new Date(day).getUTCDay()]}
            </DayButton>
          </li>
        ))}
      </DayList>
    </>
  );
};
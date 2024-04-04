import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import moment from 'moment';
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justfiy-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }
`;

const ReactCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <StyledCalendarWrapper>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format('D')}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
      />
    </StyledCalendarWrapper>
  );
};

export default ReactCalendar;

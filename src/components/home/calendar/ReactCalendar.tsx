import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import { Transactions } from "./types";
import "react-calendar/dist/Calendar.css";

type Value = Date | Date[];

interface ReactCalendarProps {
  transactions: Transactions;
  onDateClick: (date: Date) => void;
}

const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 20px;
    padding: 2% 3%;
    background-color: white;
  }

`;

const TransactionInfo = styled.div`
  margin-top: 5px;
  text-align: center;
  font-size: 0.8em;
`;

const Income = styled.div`
  color: green;
`;

const Expense = styled.div`
  color: purple;
`;

const ReactCalendar: React.FC<ReactCalendarProps> = ({
  transactions,
  onDateClick,
}) => {
  const getTitleContent = ({ date, view }: { date: Date; view: string }) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    const transaction = transactions[dateString];

    if (transaction && view === "month") {
      return (
        <TransactionInfo>
          {transaction.income > 0 && (
            <Income>+{transaction.income.toLocaleString()}원</Income>
          )}
          {transaction.expense > 0 && (
            <Expense>-{transaction.expense.toLocaleString()}원</Expense>
          )}
        </TransactionInfo>
      );
    }

    return null;
  };

  return (
    <StyledCalendarWrapper>
      <Calendar
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
        tileContent={({ date, view }) => getTitleContent({ date, view })}
        onClickDay={onDateClick}
      />
    </StyledCalendarWrapper>
  );
};

export default ReactCalendar;

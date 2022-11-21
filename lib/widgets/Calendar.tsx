import React, { FunctionComponent, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

type Props = {};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar: FunctionComponent<Props> = () => {
  const [date, setDate] = useState<Date>(new Date(new Date().setDate(1)));

  // date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const _lastDay = lastDay;

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));

  const _sameDate = (a: Date, b: Date): boolean => {
    return (
      a.getFullYear() == b.getFullYear() &&
      a.getMonth() == b.getMonth() &&
      a.getDate() == b.getDate()
    );
  };

  return (
    <div className="calendar">
      <div className="calendar__heading">
        <div className="title">Calendar</div>
        <div className="actions">
          <div>
            <div className="event" />
            <div>Event</div>
          </div>
          <div>
            <div className="holiday" />
            <div>Holiday</div>
          </div>
        </div>
      </div>
      <div className="month">
        <div
          onClick={() => {
            setDate(
              (prev) => new Date(new Date(prev).setMonth(prev.getMonth() - 1))
            );
          }}
          className="prev"
        >
          <ChevronLeftIcon height={1} width={1} color="grey" />
        </div>
        <div className="date">
          <h1>{months[date.getMonth()] + " " + date.getFullYear()}</h1>
        </div>
        <div
          onClick={() => {
            setDate(
              (prev) => new Date(new Date(prev).setMonth(prev.getMonth() + 1))
            );
          }}
          className="next"
        >
          <ChevronRightIcon height={1} width={1} color="grey" />
        </div>
      </div>
      <div className="calendar__weekdays">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="days">
        {[...new Array(firstDayIndex)].map((e, index) => {
          // console.log("rendered");
          return (
            <div className="prev-date">
              {prevLastDay - (firstDayIndex - index) + 1}
            </div>
          );
        })}
        {[...Array(lastDay)].map((e, i) => {
          return (
            <div
              className={
                _sameDate(
                  selectedDate,
                  new Date(date.getFullYear(), date.getMonth(), i + 1)
                )
                  ? "selected"
                  : ""
              }
              onClick={() => {
                setSelectedDate(
                  new Date(date.getFullYear(), date.getMonth(), i + 1)
                );
              }}
            >
              {i + 1}
            </div>
          );
        })}
        {[...Array(nextDays)].map((e, index) => {
          return <div className="next-date">{index + 1}</div>;
        })}
      </div>
    </div>
  );
};

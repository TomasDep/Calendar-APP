import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { CalendarEvent, CalendarModal, NavBar } from "../";
import { localizer } from "../../helpers";

const events = [
  {
    title: "My birthday",
    notes: "Buying cakes",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#faf",
    user: {
      _id: "123",
      name: "TomasDep",
    },
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "#FFF",
    };
    return { style };
  };
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };
  const onSelect = (event) => {
    console.log({ click: event });
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  return (
    <>
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};

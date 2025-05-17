import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarPage() {
  const [trips, setTrips] = useState([]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center my-4 pt-14 pb-4 text-color1 font-text">Kalendarz podróży</h1>
      <div className="calendar mx-auto my-5 bg-white rounded-lg p-4 ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          trips={trips}
          selectable={true}
          editable={true}
          dateClick={(info) =>
            alert(`Kliknięto na datę: ${info.dateStr}`)
          }
        />
      </div>
    </div>
  );
}

export default CalendarPage;
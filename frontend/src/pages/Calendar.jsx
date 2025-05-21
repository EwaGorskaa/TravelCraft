import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";


function CalendarPage() {
  const [plans, setPlans] = useState([]);


  useEffect(() => {
    const fetchPlans = async() => {
      const token = localStorage.getItem("token")
      if(token){
        try{
            const config = {
                method: "GET",
                url: "http://localhost:3001/api/plans/",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }
            const res = await axios(config);
            const plansFromResponse = res.data.data;  

        const formatted = plansFromResponse.map(plan => ({
          id: plan._id,
          title: plan.title,
          start: plan.startDate,
          end: new Date(new Date(plan.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          allDay: true
        }));
        setPlans(formatted)
      }
    catch(error){
      console.error("Błąd podczas pobierania planów:", error);
    }
  }
  };
  fetchPlans();
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center my-4 pt-14 pb-4 text-color1 font-text">Kalendarz podróży</h1>
      <div className="calendar mx-auto my-5 bg-white rounded-lg p-4 ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={plans}
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
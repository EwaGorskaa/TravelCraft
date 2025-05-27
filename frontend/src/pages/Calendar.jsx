import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import PlanModal from "../components/PlanModal";
import axios from "axios";


function CalendarPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
          const colors = ["#A8D5BA", "#FFD6A5", "#FFABAB", "#D7E3FC", "#E2F0CB", "#FFC8DD", "#B5EAD7", "#CBAACB", "#FFDAC1", "#D0F4DE",];
          const formatted = plansFromResponse.map((plan, i) => ({
            id: plan._id,
            title: plan.title,
            start: plan.startDate,
            backgroundColor: colors[i % colors.length],
            borderColor: colors[i % colors.length],
            extendedProps: { ...plan },
            end: new Date(new Date(plan.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            allDay: true
          }));
          setPlans(formatted)
      }
      catch(error){
        console.error("Błąd podczas pobierania planów:", error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
          }
      }
    }
    else{
      console.error("Brak tokenu!")
      localStorage.removeItem("token");
      window.location.reload();
      return;
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
            alert(`Kliknięto na datę: ${info.dateStr}`)}
          eventClick={(info) =>{
            const selectedPlan = info.event.extendedProps;
            setSelectedPlan(selectedPlan)
          }}
          
        />
         {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
      </div>
    </div>
  );
}

export default CalendarPage;
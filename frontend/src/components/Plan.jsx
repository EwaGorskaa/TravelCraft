import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccommodationList from "../components/AccomodationList";
import TransportList from "../components/TransportList";
import AttractionList from "../components/AttractionList";
import { FaCheckCircle, FaClock, FaPlaneDeparture } from "react-icons/fa";

function Plan({plan, onDelete}){
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null)

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("pl-PL");
    };

    const getStatus = () => {
        const now = new Date();
        const start = new Date(plan.startDate);
        const end = new Date(plan.endDate);

        if(end < now) return {label: "Zakończony", icon: <FaCheckCircle className="text-green-600 ml-2"/>};
        if(start > now) return {label: "Nadchodzący", icon: <FaPlaneDeparture className="text-blue-500 ml-2"/>}
        return {label: "W trakcie", icon: <FaClock className="text-yellow-500 ml-2"/>}
    }

    const status = getStatus();

    return (
           <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-text font-bold text-color2">{plan.title} </h2>
                        <span className="ml-2 italic text-sm font-normal font-italic text-gray-600 flex items-center">
                            ({status.label}) {status.icon}
                        </span>
                        </div>
                    <p className="text-sm text-gray-500"> {formatDate(plan.startDate)} - {formatDate(plan.endDate)}</p>
                </div>
                <button
                    className="text-sm font-text text-color2 hover:underline"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Zwiń" : "Rozwiń"}
                </button>
            </div>
            {expanded && (
                <div className="mt-4 space-y-2 text-sm font-text text-gray-700">
                    <p><strong>Opis:</strong> {plan.description}</p>
                    <AccommodationList accommodations={plan.accommodations} />
                    <TransportList transports={plan.transports}/>
                    <AttractionList attractions={plan.attractions}/>
                    <p><strong>Checklist:</strong> {plan.checklist.join(", ") || "brak"}</p>
                    <div className="flex flex-col justify-center pt-10">
                    {error && <div className="text-center font-text py-4 text-red-600">{error}</div>}</div>
                    <Link
                        to={"/newplan"}
                        state={{ plan }}
                        className="inline-block mt-2 text-color4 text-sm underline"
                    >
                        Edytuj szczegóły
                    </Link>
                    <button type="button" onClick={() => onDelete(plan._id)} className="bg-red-700 text-white font-text py-1 px-2 m-4 rounded-md">
                        Usuń plan
                    </button>
                </div>
            )}
        </div>
    )
}

export default Plan;
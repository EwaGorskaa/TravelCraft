import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Plan({plan}){


    const [expanded, setExpanded] = useState(false);
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("pl-PL");
    };

    return (
           <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-text font-bold text-color2">{plan.title}</h2>
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
                    <p><strong>Noclegi:</strong> {(plan.accommodations || []).join(", ")}</p>
                    <p><strong>Transporty:</strong> {(plan.transports || []).join(", ")}</p>
                    <p><strong>Atrakcje:</strong> {(plan.attractions || []).join(", ")}</p>
                    <p><strong>Checklist:</strong> {plan.checklist.join(", ") || "brak"}</p>
                    <Link
                        to={`/plans/${plan._id}`}
                        className="inline-block mt-2 text-color4 text-sm underline"
                    >
                        Przejdź do szczegółów
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Plan;
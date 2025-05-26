import { Link } from "react-router-dom"

function PlanCard({ plan, onDetailsClick }){
    return (
        <div className="rounded-xl shadow-md border p-4 mb-4 bg-white flex flex-col items-center">
            <h2 className="text-xl font-bold font5 color4">{plan.title}</h2>
            <p className="text-gray-600 font-bold font-text"> {plan.destination}</p>
            <p className="text-gray-600 font-bold font-text"> {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</p>
            <button onClick={onDetailsClick} className="bgcolor4 font-text text-white p-2 rounded">Szczegóły wyjazdu</button>
        </div>
    )
}

export default PlanCard;
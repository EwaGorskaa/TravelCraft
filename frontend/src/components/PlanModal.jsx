function PlanModal({plan, onClose}) {
    if (!plan) return null;
    return (
        <div className="fixed inset-0 font-text bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-xl relative">
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold font5 color1 mb-4">{plan.title}</h2>
                <p><span className="font-semibold">Cel podróży:</span> {plan.mainDestination}</p>
                <p><span className="font-semibold">Data:</span> {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</p>

                {plan.accommodations?.length > 0 && (
                    <>
                    <h3 className="font-bold mt-4">Noclegi:</h3>
                    <ul className="list-disc pl-6 list-none">
                        {plan.accommodations.map((a, i) => (
                        <li key={i}>{a.name}, {a.location}, {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}</li>
                        ))}
                    </ul>
                    </>
                )}

                {plan.transports?.length > 0 && (
                    <>
                    <h3 className="font-bold mt-4">Transport:</h3>
                    <ul className="list-disc pl-6 list-none">
                        {plan.transports.map((t, i) => (
                        <li key={i}>{t.type}: {t.departurePlace} → {t.destination}, dnia {new Date(t.date).toLocaleDateString()} {t.time}</li>
                        ))}
                    </ul>
                    </>
                )}

                {plan.attractions?.length > 0 && (
                    <>
                    <h3 className="font-bold mt-4">Atrakcje:</h3>
                    <ul className="list-disc pl-6 list-none">
                        {plan.attractions.map((a, i) => (
                        <li key={i}>{a.name} ({a.location}), {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}</li>
                        ))}
                    </ul>
                    </>
                )}
            </div>
        </div>

    )
}

export default PlanModal;
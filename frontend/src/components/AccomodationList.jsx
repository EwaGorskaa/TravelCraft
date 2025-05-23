function AccommodationList({ accommodations }){

    if(!accommodations?.length ) return <p><strong>Noclegi: </strong>Brak noclegów </p>

    return (
        <div>
            <strong>Noclegi:</strong>
            <ul className="list-disc ml-4">
                {accommodations.map((acc, index) => (
                        <li key={index}>
                            <p>{acc.name} – {acc.location}</p>
                            <p>Od {new Date(acc.startDate).toLocaleDateString("pl-PL")} do {new Date(acc.endDate).toLocaleDateString("pl-PL")}</p>
                            <p>Koszt: {acc.nightCost} zł/noc</p>
                            {acc.Notes && <p>Notatki: {acc.Notes}</p>}
                        </li>
                ))}
            </ul>
        </div>
    )
}



export default AccommodationList
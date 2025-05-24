function AttractionList({ attractions }){

    if(!attractions?.length ) return <p><strong>Atrakcje: </strong>Brak zaplanowanych atrakcji </p>

    return (
        <div>
            <strong>Atrakcje:</strong>
            <ul className="list-disc ml-4">
                {attractions.map((atr, index) => (
                        <li className="list-none mb-4 border-b border-gray-300 w-1/4 pb-2 inline-block" key={index}>
                            <p>{atr.name}</p>
                            <p>Lokalizacja: {atr.location}</p>
                            <p>{new Date(atr.startDate).toLocaleDateString("pl-PL")} - {new Date(atr.endDate).toLocaleDateString("pl-PL")}</p>
                            {atr.startTime && <p>Start: {atr.startTime}</p>}
                            <p>Czas trwania: {atr.duration}</p>
                            <p>Koszt: {atr.cost}</p>
                            {atr.notes && <p>Notatki: {atr.notes}</p>}
                        </li>
                  
                ))}
            </ul>
        </div>
    )
}



export default AttractionList;
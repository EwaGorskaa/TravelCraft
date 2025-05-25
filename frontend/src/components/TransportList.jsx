function TransportList({ transports }){

    if(!transports?.length ) return <p><strong>Transport: </strong>Brak transportu </p>

    return (
        <div>
            <strong>Transport:</strong>
            <ul className="list-disc ml-4">
                {transports.map((tr, index) => (
                        <li className="list-none mb-4 border-b border-gray-300 w-1/4 pb-2" key={index}>
                            <p>Środek transportu: {tr.type}</p>
                            <p>Koszt: {tr.cost}</p>
                            <p>Data odjazdu: {new Date(tr.date).toLocaleDateString("pl-PL")} {tr.time}</p>
                            <p>Długość podróży: {tr.duration}</p>
                            <p>Miejsce odjazdu: {tr.departurePlace}</p>
                            <p>Destynacja: {tr.destination}</p>
                        </li>
                  
                ))}
            </ul>
        </div>
    )
}



export default TransportList;
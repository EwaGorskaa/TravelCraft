import { useState } from "react";
import { FiTrash } from "react-icons/fi";

const PlanForm = ({ onSubmit }) => {

    const [plan, setPlan] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        accommodations: [],
        transports: [],
        attractions: [],
        checklist: [],
    });

    const handleSubmit = (e) => {
        console.log("test")
    }

    const handleAddAccommodation = () => {
        setPlan((prev) =>({
            ...prev,
            accommodations: [
                ...prev.accommodations,
                {
                    name: "",
                    location: "",
                    nightCost: 0,
                    startDate: "", 
                    endDate: "",
                    checkIn: "",
                    checkOut: "",
                    notes: "",
                }
            ]
        }))
    }

    const handleAccommodationChange = (index, e) => {
        const updated = [...plan.accommodations];
        updated[index][e.target.name] = e.target.value;
        setPlan({...plan, accommodations: updated});
    }

    const handleDeleteAccommodation = (accToRemove) => {
        setPlan((prev) => ({
            ...prev,
            accommodations: prev.accommodations.filter((_, index) => index != accToRemove),
        }))
    }


    const handleAddTransport = () => {
        setPlan((prev) =>({
            ...prev,
                transports: [
                ...prev.transports,
                {
                    type: "",
                    cost: 0,
                    date: "", 
                    time: "",
                    duration: "",
                    departureDate: "",
                    destination: "",
                }
            ]
        }))
    }

    const handleTransportChange = (index, e) => {
        const updated = [...plan.transports];
        updated[index][e.target.name] = e.target.value;
        setPlan({...plan, transports: updated});
    }

    const handleDeleteTransport = (trToRemove) => {
        setPlan((prev) => ({
            ...prev,
            transports: prev.transports.filter((_, index) => index != trToRemove),
        }))
    }

    return (
        <from onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto rounded-xl bgcolor4 p-10">
            <h2 className="text-color1 font5 text-3xl">Nowy Plan Podróży</h2>
            <input name="title" type="text" placeholder="Tytuł" value={plan.value} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            <textarea name="description" placeholder="Opis" value={plan.description}  rows={5} className="w-full p-2 border border-color5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
            <input name="mainDestination" placeholder="Główna destynacja" value={plan.mainDestination} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            <div className="flex gap-4">  
                <input name="startDate" type="date" value={plan.startDate} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                <input name="endDate" type="date" value={plan.endDate} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font5 color1">Noclegi</h3>
                    <button type="button" onClick={handleAddAccommodation} className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj nocleg
                    </button>
                </div>
                {plan.accommodations.map((acc, index) => {
                    return(
                    <div key={index} className="p-4 mt-2 border rounded bgcolor5 space-y-2">
                        <div className="flex justify-end py-4 px-2">
                            <button onClick={() => handleDeleteAccommodation(index)} className=" hover:text-red-800" title="Usuń ten nocleg">
                                <FiTrash className="w-5 h-5" />
                            </button>
                        </div>
                        <input name="name" placeholder="Nazwa" value={acc.name} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                         <input name="location" placeholder="Lokalizacja" value={acc.location} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                         <input name="nightCost" type="number" placeholder="Koszt za noc" value={acc.nightCost} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        <div className="flex gap-4">  
                            <input name="startDate" type="date" value={acc.startDate} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="endDate" type="date" value={acc.endDate} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        </div>
                        <input name="checkIn" placeholder="Zameldowanie" value={acc.checkIn} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                        <input name="checkOut" placeholder="Wymeldowanie" value={acc.checkOut} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                          <textarea name="notes" placeholder="Notatki" value={acc.Notes} onChange={(e) => handleAccommodationChange(index, e)} className="w-full border p-1 rounded"/>
                    </div>
                    )
                })} 
            </div>
             <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font5 color1">Transport</h3>
                    <button type="button" onClick={handleAddTransport} className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj transport
                    </button>
                </div>
                {plan.transports.map((tr, index) => {
                    return (
                        <div key={index} className="p-4 mt-2 border rounded bgcolor5 space-y-2">
                            <div className="flex justify-end py-4 px-2">
                                <button onClick={() => handleDeleteTransport(index)} className="hover:text-red-800" title="Usuń ten transport">
                                    <FiTrash className="w-5 h-5"/>
                                </button>
                            </div>
                            <input name="type" placeholder="Typ transportu" value={tr.type} onChange={(e) => handleTransportChange(index, e)}
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="cost" type="number" placeholder="Koszt transportu" value={tr.cost} onChange={(e) => handleTransportChange(index, e)} 
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <h3 className="pt-4 font-text color1">Data i godzina odjazdu</h3> 
                            <div className="flex gap-4"> 
                                <input name="date" type="date" value={tr.startDate} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                                <input name="time" type="time" value={tr.time} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            </div>
                            <input name="duration" placeholder="Czas podróży" value={tr.duration} onChange={(e) => handleTransportChange(index, e)} 
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="departurePlace" placeholder="Miejsce wyjazdu" value={tr.departurePlace} onChange={(e) => handleTransportChange(index, e)} 
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="destination" placeholder="Destynacja" value={tr.destination} onChange={(e) => handleTransportChange(index, e)} 
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font5 color1">Atrakcje</h3>
                    <button type="button" className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj atrakcję
                    </button>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font5 color1">Checklist</h3>
                    <button type="button" className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj element
                    </button>
                </div>
            </div>
            <div className="flex justify-center pt-10">
             <button type="submit" className="bgcolor1 text-white px-4 py-2 rounded">
                Zapisz plan
            </button>
            </div>
        </from>
    )
}


export default PlanForm;
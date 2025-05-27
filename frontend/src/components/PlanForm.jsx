import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import axios from "axios";
const PlanForm = ({ initialPlan = null, edit = false, onSubmit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [plan, setPlan] = useState(
        initialPlan ?? {
        title: "",
        description: "",
        mainDestination: "",
        startDate: "",
        endDate: "",
        accommodations: [],
        transports: [],
        attractions: [],
        checklist: [],
    });

    useEffect(() => {
        if(initialPlan) {
            setPlan({
                ...initialPlan,
                accommodations: initialPlan.accommodations ?? [],
                transports: initialPlan.transports ?? [],
                attractions: initialPlan.attractions ?? [],
                checklist: initialPlan.checklist ?? [],         
            });
        }
    }, [initialPlan]);

    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const token = localStorage.getItem("token")
                const config = {
                    method: edit ? "PUT" : "POST",
                    url: edit ? `http://localhost:3001/api/plans/${plan._id}` : "http://localhost:3001/api/plans/",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    data: plan 
                }
                const {data:res} = await axios(config)
                if(edit){
                    navigate('/myplans', { state: { message: "Plan zaktualizowano pomyślnie!" } }); 
                }
                else{
                    navigate('/myplans', { state: { message: "Plan dodano pomyślnie!" } });
                }

        }
        catch(error){
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
                localStorage.removeItem("token");
                window.location.reload();
            }
        }
        finally{
            setIsSubmitting(false);
        }
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
                    departurePlace: "",
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

    
    const handleAddAttraction = () => {
        setPlan((prev) => ({
            ...prev,
            attractions: [
                ...prev.attractions,
                {
                    name: "",
                    location: "", 
                    startDate: "",
                    endDate: "",
                    duration: "",
                    cost: 0,
                    startTime: "",
                    notes: "",
                }
            ]
        }))
    }

    const handleAttractionChange = (index, e) => {
        const updated = [...plan.attractions];
        updated[index][e.target.name] = e.target.value;
        setPlan({...plan, attractions: updated });
    }

    const handleDeleteAttraction = (atrToRemove) => {
        setPlan((prev) => ({
            ...prev,
            attractions: prev.attractions.filter((_, index) => index != atrToRemove),   
        }))
    }

    const handleAddChecklistItem = () => {
        setPlan(prev => ({
            ...prev,
            checklist: [
                ...prev.checklist,
                { text: "", done: false }
            ]
        }));
    };

    const handleChecklistItemChange = (index, e) => {
        const updated = [...plan.checklist];
        updated[index].text = e.target.value;
        setPlan({ ...plan, checklist: updated });
    };

    const handleDeleteChecklistItem = (indexToRemove) => {
        setPlan(prev => ({
            ...prev,
            checklist: prev.checklist.filter((_, index) => index !== indexToRemove)
        }));
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto rounded-xl bgcolor4 p-10">
            <h2 className="text-color1 font5 text-3xl">{edit ? "Edytuj Plan" : "Nowy Plan Podróży" }</h2>
            <input name="title" type="text" placeholder="Tytuł" value={plan.title}  onChange={(e) => setPlan({ ...plan, title: e.target.value })} className="w-full border p-2 border-color5 rounded-md color1 focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            <textarea name="description" placeholder="Opis" value={plan.description} onChange={(e) => setPlan({ ...plan, description: e.target.value })} rows={5} className="w-full p-2 border border-color5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
            <input name="mainDestination" placeholder="Główna destynacja" value={plan.mainDestination}  onChange={(e) => setPlan({ ...plan, mainDestination: e.target.value })} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            <div className="flex gap-4">  
                <input name="startDate" type="date" value={plan.startDate} onChange={(e) => setPlan({ ...plan, startDate: e.target.value })} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                <input name="endDate" type="date" value={plan.endDate} onChange={(e) => setPlan({ ...plan, endDate: e.target.value })} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font5 color1">Noclegi</h3>
                    <button type="button" onClick={handleAddAccommodation} className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj nocleg
                    </button>
                </div>
                {(plan.accommodations ?? []).map((acc, index) => {
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
                        <h3 className="pt-4 font-text color1">Data zameldowania i wymeldowania</h3>
                        <div className="flex gap-4">  
                            <input name="startDate" type="date" value={acc.startDate} onChange={(e) => handleAccommodationChange(index, e)} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="endDate" type="date" value={acc.endDate} onChange={(e) => handleAccommodationChange(index, e)} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        </div>
                        <input name="checkIn" placeholder="Zameldowanie" value={acc.checkIn} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                        <input name="checkOut" placeholder="Wymeldowanie" value={acc.checkOut} onChange={(e) => handleAccommodationChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                          <textarea name="notes" placeholder="Notatki" value={acc.notes} onChange={(e) => handleAccommodationChange(index, e)} className="w-full border p-1 rounded"/>
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
                {(plan.transports ?? []).map((tr, index) => {
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
                                <input name="date" type="date" value={tr.date} onChange={(e) => handleTransportChange(index, e)} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                                <input name="time" type="time" value={tr.time} onChange={(e) => handleTransportChange(index, e)} className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
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
                    <button type="button" onClick={handleAddAttraction} className="bgcolor5 color1 px-3 py-1 rounded">
                        + Dodaj atrakcję
                    </button>
                </div>
                {(plan.attractions ?? []).map((atr, index) => {
                    return(
                    <div key={index} className="p-4 mt-2 border rounded bgcolor5 space-y-2">
                        <div className="flex justify-end py-4 px-2">
                            <button onClick={() => handleDeleteAttraction(index)} className=" hover:text-red-800" title="Usuń ten nocleg">
                                <FiTrash className="w-5 h-5" />
                            </button>
                        </div>
                        <input name="name" placeholder="Nazwa" value={atr.name} onChange={(e) => handleAttractionChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                         <input name="location" placeholder="Lokalizacja" value={atr.location} onChange={(e) => handleAttractionChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                         <input name="cost" type="number" placeholder="Koszt" value={atr.cost} onChange={(e) => handleAttractionChange(index, e)} 
                        className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        <h3 className="pt-4 font-text color1">Data rozpoczęcia i zakończenia</h3>
                        <div className="flex gap-4">  
                            <input name="startDate" type="date" value={atr.startDate} onChange={(e) => handleAttractionChange(index, e)}  className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                            <input name="endDate" type="date" value={atr.endDate} onChange={(e) => handleAttractionChange(index, e)}  className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5" required/>
                        </div>
                        <div className="flex gap-4">  
                            <input name="startTime" type="time" value={atr.startTime} onChange={(e) => handleAttractionChange(index, e)}  className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                            <input name="duration" placeholder="Czas trwania" value={atr.duration} onChange={(e) => handleAttractionChange(index, e)} 
                            className="w-full border p-2 border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"/>
                        </div>
                        <textarea name="notes" placeholder="Notatki" value={atr.notes} onChange={(e) => handleAttractionChange(index, e)} className="w-full border p-1 rounded"/>
                    </div>
                    )
                })} 
            </div>
           <div>
    <div className="flex justify-between items-center">
        <h3 className="text-xl font5 color1">Checklist</h3>
        <button type="button" onClick={handleAddChecklistItem} className="bgcolor5 color1 px-3 py-1 rounded">
            + Dodaj element
        </button>
    </div>
    {plan.checklist.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mt-2 p-2  ">
            <input
                type="text"
                value={item.text}
                onChange={(e) => handleChecklistItemChange(index, e)}
                placeholder={`Zadanie ${index + 1}`}
                className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5"
            />
            <button
                type="button"
                onClick={() => handleDeleteChecklistItem(index)}
                title="Usuń"
            >
                <FiTrash className="w-5 h-5" />
            </button>
        </div>
    ))}
</div>
            <div className="flex flex-col justify-center pt-10">
                {error && <div className="text-center font-text py-4 text-red-600">{error}</div>}
<button
        type="submit"
        disabled={isSubmitting}
        className={`bgcolor1 text-white font-text px-4 py-2 rounded transition duration-300 flex items-center justify-center gap-2 ${
            isSubmitting ? "cursor-not-allowed" : "hover:bg-color3" }`}
    >
        {isSubmitting ? (
            <>
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
                Przetwarzanie...
            </>
        ) : (
            `${edit ? "Zaktualizuj" : "Dodaj"} plan`
        )}
    </button>
            </div>
        </form>
    )
}


export default PlanForm;
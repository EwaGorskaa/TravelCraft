import {useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from 'react-router-dom';
import PlanCard from "../components/PlanCard";
function UserPanel(){
    const [user, setUser] = useState({});
    const [plans, setPlans] = useState([]);
    const [upcomingPlans, setUpcomingPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const token = localStorage.getItem("token")
                const config = {
                    method: "GET",
                    url: "http://localhost:3001/api/user/",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                }
                const {data:res} = await axios(config)
                setUser(res.data);
                if(res.data._id){
                    fetchPlans(res.data._id)
                }
            }
            catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <=500){
                    console.log("cos poszlo nie tak z getUser")
                }
            }
        };


        const fetchPlans = async (userId) => {
            try{
                const token = localStorage.getItem("token")
                const config = {
                    method: "GET",
                    url: "http://localhost:3001/api/plans/",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                }
                const {data:res} = await axios(config)
                setPlans(res.data);
            }
            catch(error){
                console.error("Błąd przy pobieraniu planów podróży użytkownika", error.message);
            }
        };


        fetchUser();
    }, []);


    useEffect(() => {
        const today = new Date();
        const upcoming = plans.filter(plan => new Date(plan.startDate) > today);
        setUpcomingPlans(upcoming);
    },[plans]);


    return(
        <div className="mt-4 pt-4">
            <h1 className="color1 my-4 p-12 font-text text-xl">Witaj ponownie, { user.username }</h1>
            <div className="bgcolor5 m-4 px-10 py-4 rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] ">
                <div className="flex flex-row justify-between items-center mb-4 px-4 ">
                <h1 className="color1  font-text text-lg text-bold">Nadchodzące Podróże</h1>
                <Link to="/newplan"><button className="bg-color1 text-white px-4 py-2 rounded hover:bg-color2 font-text">Zaplanuj kolejną podróż</button></Link>
                </div>
                {upcomingPlans.length === 0 ? (
                    <div className="text-center text-color1 py-8 italic font-text">Brak zaplanowanych podróży :(</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {upcomingPlans.map(plan => (
                            <PlanCard key={plan._id} plan={plan} onDetailsClick={() => {
                                setSelectedPlan(plan)
                                setIsModalOpen(true)}}/>
                        ))}
                        {isModalOpen && selectedPlan && (
                        <div className="fixed inset-0 font-text bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-xl w-full shadow-xl relative">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold font5 color1 mb-4">{selectedPlan.title}</h2>
                            <p><span className="font-semibold">Cel podróży:</span> {selectedPlan.mainDestination}</p>
                            <p><span className="font-semibold">Data:</span> {new Date(selectedPlan.startDate).toLocaleDateString()} - {new Date(selectedPlan.endDate).toLocaleDateString()}</p>

                            {selectedPlan.accommodations?.length > 0 && (
                                <>
                                <h3 className="font-bold mt-4">Noclegi:</h3>
                                <ul className="list-disc pl-6 list-none">
                                    {selectedPlan.accommodations.map((a, i) => (
                                    <li key={i}>{a.name}, {a.location}, {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}</li>
                                    ))}
                                </ul>
                                </>
                            )}

                            {selectedPlan.transports?.length > 0 && (
                                <>
                                <h3 className="font-bold mt-4">Transport:</h3>
                                <ul className="list-disc pl-6 list-none">
                                    {selectedPlan.transports.map((t, i) => (
                                    <li key={i}>{t.type}: {t.departurePlace} → {t.destination}, dnia {new Date(t.date).toLocaleDateString()} {t.time}</li>
                                    ))}
                                </ul>
                                </>
                            )}

                            {selectedPlan.attractions?.length > 0 && (
                                <>
                                <h3 className="font-bold mt-4">Atrakcje:</h3>
                                <ul className="list-disc pl-6 list-none">
                                    {selectedPlan.attractions.map((a, i) => (
                                    <li key={i}>{a.name} ({a.location}), {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}</li>
                                    ))}
                                </ul>
                                </>
                            )}
                            </div>
                        </div>
                        )}

                    </div>

                )}
            </div>
        </div>
        
    )
}

export default UserPanel;
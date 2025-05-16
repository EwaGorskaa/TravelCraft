import {useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from 'react-router-dom';
import { PlanCard } from "../components/PlanCard";
function UserPanel(){
    const [user, setUser] = useState({});
    const [plans, setPlans] = useState([]);
    const [upcomingPlans, setUpcomingPlans] = useState([]);


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
                const response = await axios.get(`http://localhost:3001/api/plans/${userId}`);
                setPlans(response.data.data || []);
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
        <div className="flex-1 mt-4 pt-4 bg-gradient-to-br from-color4 via-color5 to-color5">
            <h1 className="color1 my-4 p-12 font-text text-xl">Witaj ponownie, { user.username }</h1>
            <div className="bgcolor5 m-4 px-10 py-4 rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] ">
                <div className="flex flex-row justify-between items-center my-4 px-4 ">
                <h1 className="color1  font-text text-lg text-bold">Nadchodzące Podróże</h1>
                <Link to="/dashboard"><button className="bg-color1 text-white px-4 py-2 rounded hover:bg-color2">Zaplanuj kolejną podróż</button></Link>
                </div>
                {upcomingPlans.length === 0 ? (
                    <div className="text-center text-color1 py-8">Brak zaplanowanych podróży :(</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {upcomingPlans.map(plan => (
                            <PlanCard key={plan._id} plan={plan}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserPanel;
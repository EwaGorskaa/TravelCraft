import {useState, useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Plan from "../components/Plan"

function UserPlans(){
    const [user, setUser] = useState({});
    const [plans, setPlans] = useState([])


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

    return(
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center my-4 pt-14 pb-4 text-color1 font-text">Moje plany</h1>
            {plans.length === 0 ? (
                <p className="text-center text-gray-500">Brak zaplanowanych podróży.</p>
            ) : (
                <div>
                    {plans.map(plan => (
                        <Plan key={plan._id} plan={plan} />
                    ))}
                </div>
            )}
        </div>
    )
}


export default UserPlans;
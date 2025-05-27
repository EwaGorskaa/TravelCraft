import {useState, useEffect} from "react"
import axios from "axios"
import { Link,  useLocation, useNavigate  } from "react-router-dom"
import { toast } from "react-toastify"
import Plan from "../components/Plan"

function UserPlans(){
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() =>{
        if(location.state?.message){
        toast(location.state.message);
        navigate(location.pathname, { replace: true, state: {} });
        }

    }, [location.state, navigate])

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            if(token){
                try{
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
                        localStorage.removeItem("token");
                        window.location.reload();
                        console.log(error.message);
                    } 
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


  const handleDelete = async (id) =>{
        const confirmed = window.confirm("Czy na pewno chcesz usunąć ten plan?");
        if(!confirmed) return;

        try{
            const token = localStorage.getItem("token")
            if(token){
                const config = {
                    method:"DELETE",
                    url: `http://localhost:3001/api/plans/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                }
            const res = await axios(config);
            setPlans((prev) => prev.filter((plan) => plan._id !== id));
            navigate('/myplans', { state: { message: "Plan usunięto pomyślnie!" } }); 
  
            }
            else{
                alert("Brak tokenu - musisz być zalogowany, aby usunąć plan");
            }    
        }
        catch(error){
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message)
            }
            
        }

    }

    return(
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center my-4 pt-14 pb-4 text-color1 font-text">Moje plany</h1>
            {plans.length === 0 ? (
                <p className="text-center text-gray-500">Brak zaplanowanych podróży.</p>
            ) : (
                <div className="w-1/2 mx-auto">
                    {plans.map(plan => (
                        <Plan key={plan._id} plan={plan} onDelete={handleDelete}/>
                    ))}
                </div>
            )}
        </div>
    )
}


export default UserPlans;
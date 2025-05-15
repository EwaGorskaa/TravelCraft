import {useState, useEffect } from "react";
import axios from "axios"; 
function UserPanel(){
    const [user, setUser] = useState({})

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
                setUser(res.data)
            }
            catch(error){
                if(error.response && error.response.status >= 400 && error.response.status <=500){
                    console.log("cos poszlo nie tak z getUser")
                }
            }
        };
        fetchUser();
    }, []);

    return(
        <div className="flex-1 mt-4 pt-4 bg-gradient-to-br from-color4 via-color5 to-color5">
            <h1 className="color1 my-4 p-12 font-text text-xl">Witaj ponownie, { user.username }</h1>
            <div>

            </div>
        </div>
    )
}

export default UserPanel;
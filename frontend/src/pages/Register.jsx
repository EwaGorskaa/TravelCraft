import { Link, useNavigate} from 'react-router-dom'
import { useState } from "react"
import axios from "axios"


function Register(){
    const [error, setError] = useState("")
    const [data, setData] = useState({username: "", email: "", password: ""})
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url = "http://localhost:3001/api/register"
            const { data: res } = await axios.post(url, data)
            navigate("/login")
        }
        catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className="bg-gradient-to-br from-color4 via-color5 to-color5 w-full flex-1 flex flex-col items-center justify-center">
        <Link to="/"><h1 className="font5 color1 text-3xl text-center m-4">TravelCraft</h1></Link>
        <div className="login rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] w-[420px] bg-color3 m-5 text-white p-4">

            <h2 className="font5 text-xl text-center m-4">Utwórz konto</h2>
            <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" 
                onChange={handleChange} value={data.username}  placeholder="Nazwa Użytkownika" name="username" required />
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" 
                onChange={handleChange} value={data.email}  placeholder="Adres Email" name="email" type="email" required />
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" 
                onChange={handleChange} value={data.password} type="password" placeholder="Hasło" name="password" required />
                
                
                {error && 
                <div className="error">
                    {error}
                </div>}
                <button type="submit" className="bgcolor4 text-white font-text py-2 m-4 rounded-lg hover:bg-opacity-80 transition duration-300">Utwórz konto</button>

            </form>
            <p className="font-text text-center m-4">
                Masz już konto?
                <Link to="/login">
                <button className="mx-4" type="button">
                    Zaloguj się
                </button>
                </Link>
            </p>
        </div>
        </div>
 
    )
}


export default Register;
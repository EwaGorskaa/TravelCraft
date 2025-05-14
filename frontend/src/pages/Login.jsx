import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


function Login(){
    const [error, setError] = useState("")
    const [data, setData] = useState({ emailOrUsername: "", Password: "" })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const url = "http://localhost:3000/api/login"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        }
        catch (error){
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className="bg-gradient-to-br from-color4 via-color5 to-color5 w-full flex-1 flex flex-col items-center justify-center">
        <h1 className="font5 color1 text-3xl text-center m-4">TravelCraft</h1>
        <div className="login rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] w-[420px] bg-color4 m-5 text-white p-4">

            <h2 className="font5 text-xl text-center m-4">Zaloguj się</h2>
            <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" onChange={handleChange} value={data.login}  placeholder="Email lub Login" name="emailOrUsername" required />
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" onChange={handleChange} value={data.Password} type="password" placeholder="Hasło" name="Password" required />
                {error && 
                <div className="error">
                    {error}
                </div>}
                <button type="submit" className="bgcolor3 text-white font-text py-2 m-4 rounded-lg hover:bg-opacity-80 transition duration-300">Zaloguj się</button>

            </form>
            <p className="font-text text-center m-4">
                Nie masz konta? 
                <Link to="/register">
                <button className="mx-4" type="button">
                    Zarejestruj się
                </button>
                </Link>
            </p>
        </div>
        </div>
 
    )
}

export default Login;
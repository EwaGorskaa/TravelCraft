import { Link, useNavigate } from "react-router-dom"
const handleSubmit = async (e) => {
    console.log("test")
    e.preventDefault()
}


function Login(){
    return (
        <div className="bg-gradient-to-br from-color4 via-color5 to-color5 w-full flex-1 flex flex-col items-center justify-center">
        <h1 className="font5 color1 text-3xl text-center m-4">TravelCraft</h1>
        <div className="login rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] w-[420px] bg-color4 m-5 text-white p-4">

            <h2 className="font5 text-xl text-center m-4">Zaloguj się</h2>
            <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" type="email" placeholder="Email lub Login" name="email/username" required />
                <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 text-color5 bg-bgcolor2 shadow-sm placeholder-color5" type="password" placeholder="Hasło" name="password" required />
                <button type="submit" className="bgcolor3 text-white font-text py-2 m-4 rounded-lg hover:bg-opacity-80 transition duration-300">Zaloguj się</button>
            </form>
            <p className="font-text text-center m-4">
                Nie masz konta? 
                <button className="mx-4" type="button">
                    Zarejestruj się
                </button>
            </p>
        </div>
        </div>
 
    )
}

export default Login;
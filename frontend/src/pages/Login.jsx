    import { Link, useNavigate } from "react-router-dom"
    import { useState } from "react"
    import axios from "axios"


    function Login(){

        const [data, setData] = useState({ emailOrUsername: "", password: "" })
        const [fieldErrors, setFieldErrors] = useState({});
        const [generalError, setGeneralError] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false)

        const handleChange = ({ currentTarget: input }) => {
            setData({ ...data, [input.name]: input.value })
            setFieldErrors({ ...fieldErrors, [input.name]: "" });
            setGeneralError("");
        };

        const handleSubmit = async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setFieldErrors({});
            setGeneralError("");
            try{
                const url = "http://localhost:3001/api/auth/login"
                const { data: res } = await axios.post(url, data)
                localStorage.setItem("token", res.token)
                window.location = "/dashboard"   
            }
            catch (error){
                if(error.response){
                    if(typeof error.response.data.message === "object")
                        setFieldErrors(error.response.data.message);
                    else{
                        setGeneralError(error.response.data.message);
                    }
                }
            }
            finally{
                setIsSubmitting(false)
            }
        }

        return (
            <div className="bg-gradient-to-br from-color4 via-color5 to-color5 w-full flex-1 flex flex-col items-center justify-center">
            <Link to="/"><h1 className="font5 color1 text-3xl text-center m-4">TravelCraft</h1></Link>
            <div className="login rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)] w-[420px] bg-color4 m-5 text-white p-4">

                <h2 className="font5 text-xl text-center m-4">Zaloguj się</h2>
                <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
                    <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5 color4" onChange={handleChange} value={data.emailOrUsername}  placeholder="Email lub Login" name="emailOrUsername"  />
                    {fieldErrors.emailOrUsername &&
                        <div className="error px-4">
                            {fieldErrors.emailOrUsername}
                        </div>}
                    <input className="m-4 px-4 py-1 border border-color5 rounded-md focus:outline-none focus:ring-2 focus:ring-bgcolor4 focus:border-bgcolor4 bg-bgcolor2 shadow-sm placeholder-color5 color4" onChange={handleChange} value={data.password} type="password" placeholder="Hasło" name="password"  />
                    {fieldErrors.password &&
                        <div className="error px-4">
                            {fieldErrors.password}
                        </div>}
                    <button type="submit" className={`bgcolor3 text-white font-text py-2 m-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 ${
                    isSubmitting ? 'cursor-not-allowed' : 'hover:bg-color1' }`} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        Logowanie...
                        </>
                    ) : ( 'Zaloguj się'
    )}
                    </button>
                    {generalError &&
                        <div className="error text-center mt-2">
                            {generalError}
                        </div>}
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
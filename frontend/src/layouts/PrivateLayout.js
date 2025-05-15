import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivateLayout(){
    return(
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <Outlet className="flex-1"/>
                <Footer/>
            </div>
        </>
    )
}

export default PrivateLayout;
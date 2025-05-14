import { Outlet } from "react-router-dom"
import Footer from '../components/Footer'

function PublicLayout(){
    return(
        <>
            <div className="min-h-screen flex flex-col">
            <Outlet className="flex-1"/>
            <Footer/>
            </div>
        </>
    )
}

export default PublicLayout;
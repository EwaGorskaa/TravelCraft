import { useEffect, useState } from "react";

function Summary({user, plans}){

    const [total, setTotal] = useState(0)
    const [upcoming, setUpcoming] = useState(0)
    const [visited, setVisited] = useState(0)

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();

        const thisYearPlans = plans.filter(plan =>{
            const planDate = new Date(plan.startDate);
            return planDate.getFullYear() === year;
        })
        setTotal(thisYearPlans.length);
        
        const upcomingPlans = thisYearPlans.filter(plan => new Date(plan.startDate) >= now);
        setUpcoming(upcomingPlans.length);

        const visitedPlaces = thisYearPlans.filter(plan => new Date(plan.endDate) < now);
        setVisited(visitedPlaces.length);

    }, [plans])

    return (
        <div className="bgcolor5 m-4 px-10 py-10 rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
            <h1 className="color1 font-text text-xl font-bold">Podsumowanie tegorocznych wyjazdów</h1>
            <div className=" mt-10 flex flex-row justify-around">
                <div className="text-center">
                    <p className="text-2xl font-bold">{total}</p>
                    <p>Łącznych podróży w tym roku</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">{visited}</p>
                    <p>Odwiedzonych miejsc</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">{upcoming}</p>
                    <p>Nadchodzących wyjazdów</p>
                </div>

            </div>
        </div>
    )
}

export default Summary;
 function Home(){
    return (
    <main className="  flex-1 pt-20 p-4 bg-gradient-to-br from-color3 via-color4 to-color5  w-full flex flex-col items-center text-white">
        <h1 className=" leading-loose text-5xl font5">TravelCraft</h1>
        <p className=" leading-normal text-2xl font-text">Zaplanuj swoje podróże </p> 
        <p className=" leading-normal text-2xl font-text italic">Lepiej.</p>
        <div className="flex flex-row items-center justify-center mt-10">
            <button class="bgcolor3 text-white font-text py-2 px-4 mx-1 rounded-lg hover:bg-opacity-80 transition duration-300"> Zaloguj się</button>
            <button class="bgcolor3 text-white font-text py-2 px-4 mx-1 rounded-lg hover:bg-opacity-80 transition duration-300"> Zarejestruj się</button>
        </div>
    </main>
    )
 }


 export default Home;
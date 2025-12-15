

const Navbar = () => {

    return (
        <div className="h-20 w-full bg-white  border-b-1 flex items-center justify-evenly" >
            <div className="text-3xl font-bold">
                <h1><span className="text-purple-700">Flip</span>earn<span className="text-4xl text-purple-700">.</span></h1>
            </div>
            <div className=" text-md font-semibold flex flex-row items-center justify-center gap-5" >
                <ul className="flex flex-row gap-8 cursor-pointer" >
                    <li>
                        Home
                    </li>
                    <li>
                        Marketplace
                    </li>
                    <li>
                        Messages
                    </li>
                    <li>
                        My Listing
                    </li>

                </ul>
                <button className="h-8 text-white font-semibold w-30 rounded-2xl bg-blue-600">Dashboard</button>


            </div>
            <div className="cursor-pointer">
                <button className="bg-red-600 h-10 w-10 rounded-full font-bold cursor-pointer ">A</button>
            </div>
        </div>
    )
}

export default Navbar;
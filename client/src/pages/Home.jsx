



const Filter = () => {
    return (
        <div className="flex sm:gap-4 gap-1 items-center bg-zinc-50 rounded-md sm:p-2 py-2 ">

            <div>
                <button className="flex gap-1 justify-center items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg> <span className="max-sm:hidden">filter</span>
                </button>
            </div>

            <div>
                <select name="semester" className="sm:px-2 p-1 rounded-lg" >

                    <option value="6">sem 6th</option>
                </select>
            </div>

            <div>
                <select name="section" className="sm:px-2 p-1 rounded-lg" >

                    <option value="A">sec A</option>
                    <option value="B">sec B</option>
                </select>
            </div>

            <div>
                <select name="subject" className="sm:px-2 p-1 rounded-lg outline-pink-300" onChange={(e) => console.log(e.target.value)} >

                    <option value="SE">SE</option>
                    <option value="CD">CD</option>
                    <option value="IWT">IWT</option>
                    <option value="WSN">WSN</option>
                    <option value="SE_LAB">SE L.</option>
                </select>
            </div>

            <div>
                <select name="module" className="sm:px-2 p-1 rounded-lg" >

                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                </select>
            </div>


        </div>
    )
}


const NoteList = () => {
    return (
        <li className="sm:text-xl flex gap-2 text-base hover:bg-pink-100 p-1 rounded-md cursor-pointer" >
            <div>
                [6 : A : SE : 1st]
            </div>
            <div className="grow text-blue-500 hover:text-blue-600 underline">
                How to make money in 2sec
            </div>
            <div className="cursor-pointer">
                <div className="max-sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                </div>
                <div className="sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>

                </div>


            </div>
        </li>
    )
}

const Home = () => {
    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">
            <Filter />


            <div className="py-5 text-lg">
                Notes
            </div>
            <ul>

                <NoteList/>
                <NoteList/>
            </ul>

        </div>
    )
}


export default Home;
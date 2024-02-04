



const Filter = () => {
    return (
        <div className="flex sm:gap-4 gap-1 items-center bg-zinc-50 rounded-md p-2 w-full">

            <div>
                <button className="flex gap-1 justify-center items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg> <span className="max-sm:hidden">filter</span>
                </button>
            </div>

          <div>
            <select name="semester" className="px-2 p-1 rounded-lg" >
                
                <option value="6">sem 6th</option>
            </select>
          </div>

          <div>
            <select name="section" className="px-2 p-1 rounded-lg" >
                
                <option value="A">sec A</option>
                <option value="B">sec B</option>
            </select>
          </div>

          <div>
            <select name="subject" className="px-2 p-1 rounded-lg outline-pink-300" onChange={(e)=>console.log(e.target.value)} >
                
                <option value="SE">SE</option>
                <option value="CD">CD</option>
                <option value="IWT">IWT</option>
                <option value="WSN">WSN</option>
                <option value="SE_LAB">SE L.</option>
            </select>
          </div>

          <div>
            <select name="module" className="px-2 p-1 rounded-lg" >
                
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

const Home = () => {
    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">
            <Filter />



            <ul>
                <li className="underline">How to make life better () </li>
                <li className="underline">How to make life better () </li>
            </ul>

        </div>
    )
}


export default Home;
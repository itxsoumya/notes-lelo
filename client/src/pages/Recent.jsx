import { useNavigate } from "react-router-dom"
import NoteList from "../components/NoteList"

const Recent = () => {
    const navigate = useNavigate();
    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">



            <div className="text-center"> <button onClick={()=>navigate('/')} className=" flex gap-2 mt-5 p-1 rounded-lg px-2 cursor-pointer bg-gray-100 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
                Go back to Use filter
            </button> </div>


            <div className="py-5 text-lg">
                Recent Notes
            </div>
            <ul>

                <NoteList />
                <NoteList />
                <NoteList />
                <NoteList />
                <NoteList />
                <NoteList />
                <NoteList />
            </ul>

        </div>
    )
}

export default Recent
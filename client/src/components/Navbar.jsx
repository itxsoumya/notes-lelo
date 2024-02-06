import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../state/atoms"


const NavBar = () => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoAtom);
    return (
        <div className="bg-pink-600 text-white shadow-md">
            <div className="flex justify-between items-center max-w-5xl mx-auto p-2">

                <div className="underline cursor-pointer">
                    {userInfo ? (<div onClick={() => navigate('/add')}>Add</div>) : (<div onClick={() => navigate('/auth')}>Login</div>)}
                </div>
                <div className="text-3xl cursor-pointer" onClick={() => navigate('/')}>NotesLelo.</div>
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>


                </div>
            </div>
        </div>
    )
}

export default NavBar
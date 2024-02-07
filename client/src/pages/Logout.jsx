import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { userInfoAtom } from "../state/atoms"


const Logout = ()=>{

    const setUser =  useSetRecoilState(userInfoAtom)

    useEffect(()=>{
        localStorage.removeItem('token')
        setUser(null)
    },[])
    return(
        <div>
            You are logged out

            <Link to={'/'} className="text-sky-500 p-8">Go Back To Home</Link>

        </div>
    )
}

export default Logout
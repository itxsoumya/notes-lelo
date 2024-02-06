import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoAtom } from "../state/atoms";


const AuthPage = ({ authUrl, to }) => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState('99XX5');
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom)

    useEffect(()=>{
        if (userInfo && userInfo.isAdmin) {
            navigate('/')
        }
        if(userInfo && to=='/add' && userInfo.isManager){
            navigate('/')
        }
    
    },[userInfo])
    const check = useCallback(async () => {
        try {
            // console.log(inputData)
            const res = await axios.post(authUrl, {
                secretCode: inputData
            })
            if (res.status == 200) {
                localStorage.setItem('token', res.data.token);
                setUserInfo(res.data.user);
                navigate(to)
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        check()
    }
    return (
        <div className=" text-xl sm:text-2xl flex justify-center items-center min-h-[75vh] -red-500">
            <form className="flex flex-col">
                <label htmlFor="ucode" className="text-lg">
                    Enter Your Secret Code
                </label>
                <input type="text" value={inputData} onChange={e => setInputData(e.target.value)} className=" p-2 border outline-pink-400 text-gray-600" placeholder="secret code" required />
                <button className="bg-cyan-500 p-3 rounded-md mt-2 text-white hover:bg-cyan-600" type="submit" onClick={handleSubmit} >Verify</button>
            </form>
        </div>
    )
}

export default AuthPage
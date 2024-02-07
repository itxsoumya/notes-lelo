import { memo, useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../state/atoms"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { addManagerUrl, allAuthorsListUrl } from "../../urlMap"


const AuthorList = ({ name, username, code }) => {
    return (
        <li className="p-2 text-lg hover:bg-pink-50 rounded-md">
            {name} (@{username}) (code: {code}) <button className="p-1 px-2 bg-green-500 rounded-lg text-white">Change</button> or <button className="p-1 px-2 bg-red-500 rounded-lg text-white">Delete</button>
        </li>
    )
}

const Admin = () => {
    const userInfo = useRecoilValue(userInfoAtom)
    const navigate = useNavigate()
    const [authorList, setAuthorList] = useState([])

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (userInfo && !userInfo.isAdmin || !userInfo) {
            navigate('/adminauth')
        }
    }, [])

    const fetchAuther = useCallback(async () => {
        try {
            const res = await axios.get(allAuthorsListUrl, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (res.status == 200) {

                setAuthorList(res.data.managersList)
            }
        } catch (err) {
            console.log(err)
        }
    }, [])
    useEffect(() => {
        fetchAuther()
    }, [])

    const addAuthor = async () => {
        
        try {
            const res = await axios.post(addManagerUrl, {
                name,
                username,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (res.status == 200) {
                fetchAuther()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">

            <h1 className="text-2xl underline"># Add Auther</h1>
            <form className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input onChange={e => setName(e.target.value)} placeholder="name" type="text" className="border p-2" required />
                <label htmlFor="username">Username</label>
                <input onChange={e => setUsername(e.target.value)} type="text" className="border p-2" placeholder="username" />




                <button onClick={e=>{
                    e.preventDefault();
                    addAuthor()
                }} className="mt-4 p-3 bg-pink-500 rounded-md text-white" type="submit">Add Auther</button>
            </form>

            <h1 className="text-2xl underline mt-4"># Author and Secret Code</h1>

            <ul>

                {(authorList.length > 0) ? authorList.map(e => <AuthorList name={e.name} username={e.username} code={e.secretCode} />) : 'there is no author'}
            </ul>

        </div>
    )
}

export default Admin;
import { Link, useNavigate } from "react-router-dom"
import NoteList from "../components/NoteList"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { notesFilterUrl } from "../../urlMap"



const Filter = ({ setSemester, setSection, setSubject, setModule }) => {
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
                <select name="semester" onChange={setSemester} defaultValue={6} className="sm:px-2 p-1 rounded-lg" >

                    <option value="6">sem 6th</option>
                </select>
            </div>

            <div>
                <select name="section" onChange={setSection} defaultValue={'B'} className="sm:px-2 p-1 rounded-lg" >

                    <option value="A">sec A</option>
                    <option value="B">sec B</option>
                </select>
            </div>

            <div>
                <select defaultValue={'CS'} name="subject" className="sm:px-2 p-1 rounded-lg outline-pink-300" onChange={setSubject} >

                    <option value="SE">SE</option>
                    <option value="CD">CD</option>
                    <option value="CS">CS</option>
                    <option value="WSN">WSN</option>
                    <option value="OE">OE</option>
                    <option value="SE_LAB">SE L.</option>
                </select>
            </div>

            <div>
                <select defaultValue={1} name="module" onChange={setModule} className="sm:px-2 p-1 rounded-lg" >

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
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const [status,setStatus] = useState('idle')

    const [semester, setSemester] = useState(6);
    const [section, setSection] = useState('B');
    const [subject, setSubject] = useState('CS');
    const [module, setModule] = useState(1);

    const filterReq = useCallback(async () => {
        setStatus('pending')
        try {
            const res = await axios.post(notesFilterUrl, {
                semester, section, subject, module
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (res.status == 200) {
                setData(res.data)
                
            }
        } catch (err) {
            console.log(err);
        }
        setStatus('idle')
    }, [semester, section, subject, module])

    useEffect(() => {
        filterReq();
    }, [semester, section, subject, module])

    
    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">
            <Filter setSemester={(e)=>setSemester(e.target.value)} setSection={(e)=>setSection(e.target.value)} setSubject={(e)=>setSubject(e.target.value)} setModule={(e)=>setModule(e.target.value)} />

            <div className="text-center">or</div>
            <div className="text-center"> <button onClick={() => navigate('/recent')} className="p-1 rounded-lg px-2 cursor-pointer bg-gray-100 hover:bg-gray-200">See Recent Uploads</button> </div>


            <div className="py-5 text-lg">
                Notes
            </div>
            
            {status=='idle'?(<ul>
                {(data.length>0) ? data.map(e => <NoteList date={e.createdAt} filelink={e.fileUrl} title={e.title} key={e._id} />) : ''}
            </ul>):(
                <div className="text-xl p-5 text-center">
                    Loading....
                </div>
            )}

        </div>
    )
}


export default Home;
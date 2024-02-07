import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../state/atoms"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from 'form-data'

const Add = () => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoAtom);

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('')
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [module, setModule] = useState('')

    useEffect(() => {
        if (!userInfo) {
            navigate('/auth')
        }

    }, [userInfo])

    const handleFileChange = (e) => {
         setFile(e.target.files[0])
        

        
    };
    //   console.log(file)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('section', section);
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('module', module);

        try {
            const res = await axios.post('http://localhost:8080/api/v1/notes/add', formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    token: localStorage.getItem('token'),
                }
            })
            if (res.status == 200) {
                console.log('success')
            }
        } catch (err) {
            console.log(err)
        }

        // try {
        //     const res = await axios.post('http://localhost:8080/api/v1/notes/add', {
        //         title, section, semester, subject, module, fileUrl:file
        //     }, {
        //         headers: {
        //             token: localStorage.getItem('token')
        //         }
        //     })
        //     if (res.status == 200) {
        //         console.log('success')
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
    }

    return (
        <form target="/ll">
            <div className="max-w-6xl mx-auto p-5 flex flex-col gap-1 mt-10">
                <label htmlFor="">Note Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Note title" className="border p-2 rounded-md outline-pink-400" />


                <div className="flex items-center justify-center w-full mt-6">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF file (bhai compress karke dena)</p>
                        </div>
                        <input id="dropzone-file" onChange={handleFileChange} type="file" className="hiddden text-gray-600" required />
                    </label>
                </div>

                <div className="mt-4">
                    <label htmlFor="semester">Chose Semester</label>
                    <select required onChange={e => setSemester(e.target.value)} name="semester" id="" className="p-2 w-full rounded-md">
                        <option value="6" selected>6th</option>
                    </select>

                    <label htmlFor="section">Chose Section</label>
                    <select name="section" onChange={(e) => setSection(e.target.value)} required id="" className="p-2 w-full rounded-md">
                        <option value="A" > section A</option>
                        <option value="B" selected > section B</option>
                    </select>

                    <label htmlFor="subject">Chose Subject</label>
                    <select required onChange={e => setSubject(e.target.value)} name="subject" id="" className="p-2 w-full rounded-md">
                        <option value="SE">SE</option>
                        <option value="CD">CD</option>
                        <option value="IWT">IWT</option>
                        <option value="WSN">WSN</option>
                        <option value="SE_LAB">SE L.</option>
                    </select>

                    <label htmlFor="module">Chose Module</label>
                    <select required onChange={e => setModule(e.target.value)} name="module" id="" className="p-2 w-full rounded-md">
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>

                    </select>


                </div>



                <label className="mt-6">Leave a message</label>
                <input type="text" className="border p-2 rounded-md outline-pink-400 " placeholder="leave a message for admin" />
                <button className="bg-sky-500 mt-6 text-white hover:p-5 p-4 sm:text-2xl text-lg rounded-lg shadow-lg hover:bg-sky-600" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default Add
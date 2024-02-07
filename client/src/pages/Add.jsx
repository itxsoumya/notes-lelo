import { useRecoilValue } from "recoil"
import { userInfoAtom } from "../state/atoms"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from 'form-data'
import { notesAddUrl } from "../../urlMap";

const Add = () => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoAtom);

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState(6)
    const [section, setSection] = useState('B');
    const [subject, setSubject] = useState('CD');
    const [module, setModule] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/auth')
        }

    }, [userInfo])

    const handleFileChange = (e) => {
        setFile(e.target.files[0])



    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('section', section);
        formData.append('semester', semester);
        formData.append('subject', subject);
        formData.append('module', module);

        try {
            const res = await axios.post(notesAddUrl, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    token: localStorage.getItem('token'),
                }
            })
            if (res.status == 200) {
                setIsSubmitting(false)
                console.log('success')
            }
        } catch (err) {
            
            console.log(err)
        }
        setIsSubmitting(false)
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
                    <select defaultValue={6} required onChange={e => setSemester(e.target.value)} name="semester" id="" className="p-2 w-full rounded-md">
                        <option value="6" selected>6th</option>
                    </select>

                    <label htmlFor="section">Chose Section</label>
                    <select defaultValue={'B'} name="section" onChange={(e) => setSection(e.target.value)} required id="" className="p-2 w-full rounded-md">
                        <option value="A" > section A</option>
                        <option value="B" > section B</option>
                    </select>

                    <label htmlFor="subject">Chose Subject</label>
                    <select required defaultValue={'CD'} onChange={e => setSubject(e.target.value)} name="subject" id="" className="p-2 w-full rounded-md">
                        <option value="SE">SE</option>
                        <option value="CD">CD</option>
                        <option value="IWT">IWT</option>
                        <option value="WSN">WSN</option>
                        <option value="SE_LAB">SE L.</option>
                    </select>

                    <label htmlFor="module">Chose Module</label>
                    <select required defaultValue={1} onChange={e => setModule(e.target.value)} name="module" id="" className="p-2 w-full rounded-md">
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>

                    </select>


                </div>



                <label className="mt-6">Leave a message</label>
                <input type="text" className="border p-2 rounded-md outline-pink-400 " placeholder="leave a message for admin" />
                <button disabled={isSubmitting} className="bg-sky-500 mt-6  text-white hoverr:p-5 p-4 sm:text-2xl text-lg rounded-lg shadow-lg hoverr:bg-sky-600" type="submit" onClick={handleSubmit}>

                    {isSubmitting ? (<div role="status" className="flex  justify-center gap-3">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-100  fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="text-white" >Uploading...</span>
                    </div>) : 'Upload'}



                </button>
            </div>
        </form>
    )
}

export default Add
import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const NoteList = ({ date, title, filelink }) => {
    

    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString();
    const navigate = useNavigate()

    const handleDownload = useCallback(() => {

        const anchor = document.createElement('a');
        anchor.href = filelink
        anchor.download = `${title}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();


        document.body.removeChild(anchor);
    }, []);

    return (
        <li className="sm:text-lg flex gap-2 text-base hover:bg-pink-100 p-1 rounded-md cursor-pointer" >
            <div className="shrink-0">
                [ {formattedDate} ]
            </div>
            <div className="grow text-blue-500 hover:text-blue-600 underline">
                <Link to={`/pdfview?srclink=${encodeURIComponent(filelink)}`} >{title}</Link>
                {/* {title} */}
            </div>
            <div className="cursor-pointer">
                <div className="max-sm:hidden" onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                </div>
                <div className="sm:hidden" onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>

                </div>


            </div>
        </li>
    )
}


export default NoteList
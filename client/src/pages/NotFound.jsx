import { Link } from "react-router-dom"


const NotFound = ()=>{
    return(
        <div className="flex flex-col gap-6 items-center justify-center my-auto min-h-[70vh]">
            <img src="https://4.bp.blogspot.com/-o_KGpNCJlxM/UwYHZosDEMI/AAAAAAAACnc/lB9cBc56zts/s1600/eaaf845200cbfe885bef8302fb6a4c401ad197a357cb86db0ee023369c331823.jpg" alt=""  className="rounded-xl shadow-2xl "/>

            <div className="underline text-xl ">
                <Link to={'/'}>Goback to home </Link>
            </div>
        </div>
    )
}

export default NotFound
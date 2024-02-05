import { memo } from "react"


const AutherList = memo(() => {
    return (
        <li className="p-2 text-lg hover:bg-pink-50 rounded-md">
            John Doe (@johnDoe) (code: {'98384'}) <button className="p-1 px-2 bg-green-500 rounded-lg text-white">Change</button> or <button className="p-1 px-2 bg-red-500 rounded-lg text-white">Delete</button>
        </li>
    )
})

const Admin = () => {


    return (
        <div className="p-2 max-w-6xl bg-red-200s mx-auto ">

            <h1 className="text-2xl underline"># Add Auther</h1>
            <form className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input placeholder="name" type="text" className="border p-2" required />
                <label htmlFor="username">Username</label>
                <input type="text" className="border p-2" placeholder="username" />




                <button className="mt-4 p-3 bg-pink-500 rounded-md text-white">Add Auther</button>
            </form>

            <h1 className="text-2xl underline mt-4"># Auther and Secret Code</h1>

            <ul>
                <AutherList/>
            </ul>

        </div>
    )
}

export default Admin;
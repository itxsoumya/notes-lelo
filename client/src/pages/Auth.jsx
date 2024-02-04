

const AuthPage = () => {
    return (
        <div className=" text-xl sm:text-2xl flex justify-center items-center min-h-[75vh] -red-500">
            <form className="flex flex-col">
                <label htmlFor="ucode" className="text-lg">
                    Enter Your Secret Code
                </label>
                <input type="text" className=" p-2 border outline-pink-400 text-gray-600" placeholder="secret code" required />
                <button className="bg-cyan-500 p-3 rounded-md mt-2 text-white hover:bg-cyan-600">Verify</button>
            </form>
        </div>
    )
}

export default AuthPage
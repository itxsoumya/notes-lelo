import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"
import Add from "./pages/Add"
import AuthPage from "./pages/Auth"
import Recent from "./pages/Recent"
import NotFound from "./pages/NotFound"
import Admin from "./pages/Admin"
import { memo, useCallback, useEffect, useState } from "react"
import { RecoilRoot, useSetRecoilState } from "recoil"
import { userInfoAtom } from "./state/atoms"
import axios from "axios"


const App = () => {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  )
}

const Main = memo(() => {
  const [status,setStatus] = useState('loading')
  const setuserInfo = useSetRecoilState(userInfoAtom)
  const checkLoggeddInOrNot = useCallback(async () => {
    try {
      console.log(localStorage.getItem('token'))

      const res = await axios.post('http://localhost:8080/api/v1/manager/me',{}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
      if (res.status == 200) {

        setuserInfo(res.data)
        setStatus('success')
      } else {
        setuserInfo(null)
      }
    } catch (err) {
      console.log(err);
      setuserInfo(null)
    }

  }, [])

  useEffect(() => {
    checkLoggeddInOrNot();
  }, [])
  if(status=='loading'){
    return(
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col ">

      <BrowserRouter>
        <NavBar />

        <div className="grow bg-green-400x ">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/auth" element={<AuthPage authUrl={'http://localhost:8080/api/v1/manager/auth'} to={'/add'} />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>

    </div>
  )
})

export default App

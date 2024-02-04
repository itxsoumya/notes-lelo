import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"
import Add from "./pages/Add"
import AuthPage from "./pages/Auth"
import Recent from "./pages/Recent"
import NotFound from "./pages/NotFound"
import Admin from "./pages/Admin"


const App = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <BrowserRouter>
        <NavBar />

        <div className="grow bg-green-400x ">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
